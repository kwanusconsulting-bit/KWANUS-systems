export async function apiGet<T>(url: string): Promise<T> {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`GET ${url} failed`);
    return res.json();
}

export async function apiPost<T>(url: string, body: unknown): Promise<T> {
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) throw new Error(`POST ${url} failed`);
    return res.json();
}
