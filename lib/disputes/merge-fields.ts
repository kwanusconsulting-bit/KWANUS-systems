
export function applyMergeFields(
    template: string,
    fields: Record<string, string>
) {
    let output = template

    Object.entries(fields).forEach(([key, value]) => {
        const placeholder = `[${key}]`
        output = output.replaceAll(placeholder, value || "")
    })

    return output
}
