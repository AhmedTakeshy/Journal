export const formattedDate = (date: string) => {
    const formatted = new Date(date);
    return formatted.toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    })
}