import { renderFile } from '../../deps.ts'

// deno-lint-ignore ban-types
export default async function view(template: string, data: object = {}): Promise<string> {
    const content = await renderFile(template, data);
    if (content) {
        return content;
    }
    throw new Error(`Unable to render template "${template}"`);
}