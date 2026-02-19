// Credits to https://github.com/sindresorhus/parse-sse/blob/main/index.js by sindresorhus

export interface ServerSentEvent {
    type: string;
    data: string;
    lastEventId: string;
    retry?: number;
}

type PartialEvent = Omit<ServerSentEvent, 'lastEventId'>;

export class ServerSentEventTransformStream extends TransformStream<string, ServerSentEvent> {
    constructor() {
        let buffer = '';
        let isFirstChunk = true;
        let event = createEvent();
        let lastEventId = ''; 

        super({
            transform(chunk: string, controller: TransformStreamDefaultController<ServerSentEvent>) {
                if (typeof chunk !== 'string') {
                    throw new TypeError('ServerSentEventTransformStream expects string chunks. Pipe through TextDecoderStream first for byte streams.');
                }
                let text = chunk;
                if (isFirstChunk) {
                    text = text.replace(/^\uFEFF/, '');
                    isFirstChunk = false;
                }

                buffer += text;
                const lines = buffer.split(/\r\n|\r|\n/);
                
                buffer = lines.pop() ?? '';

                for (const line of lines) {
                    if (line === '') {
                        dispatchEvent(event, controller, lastEventId);
                        event = createEvent();
                        continue;
                    }

                    if (line.startsWith(':')) {
                        continue;
                    }

                    processField(line, event, (value: string) => {
                        lastEventId = value;
                    });
                }
            },

            flush(controller: TransformStreamDefaultController<ServerSentEvent>) {
                if (buffer && !buffer.startsWith(':')) {
                    processField(buffer, event, (value: string) => {
                        lastEventId = value;
                    });
                }
                dispatchEvent(event, controller, lastEventId);
            },
        });
    }
}

function createEvent(): PartialEvent {
    return {
        type: '',
        data: '',
        retry: undefined,
    };
}

function dispatchEvent(
    event: PartialEvent, 
    controller: TransformStreamDefaultController<ServerSentEvent>, 
    lastEventId: string
): void {
    let { data } = event;
    if (data.endsWith('\n')) {
        data = data.slice(0, -1);
    }
    if (!data) {
        return;
    }
    controller.enqueue({
        type: event.type || 'message',
        data,
        lastEventId, 
        retry: event.retry,
    });
}

function processField(
    line: string, 
    event: PartialEvent, 
    setLastEventId: (value: string) => void
): void {
    const colonIndex = line.indexOf(':');
    const field = colonIndex === -1 ? line : line.slice(0, colonIndex);
    let value = colonIndex === -1 ? '' : line.slice(colonIndex + 1);
    if (value.startsWith(' ')) {
        value = value.slice(1);
    }
    switch (field) {
        case 'event':
            event.type = value;
            break;
        case 'data':
            event.data += value + '\n';
            break;
        case 'id':
            if (!value.includes('\0')) {
                setLastEventId(value);
            }
            break;
        case 'retry':
            if (/^\d+$/.test(value)) {
                event.retry = Number.parseInt(value, 10);
            }
            break;
        default:
            break;
    }
}

export function parseServerSentEvents(response: Response): ReadableStream<ServerSentEvent> {
    if (!response) {
        throw new TypeError('Expected a Response object');
    }
    if (!response.body) {
        throw new TypeError('Expected response to have a body');
    }
    return response.body
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new ServerSentEventTransformStream());
}