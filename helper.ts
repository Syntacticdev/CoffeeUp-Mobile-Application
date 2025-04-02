export const formatter = Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

export const getSize = (size: string) => {
    switch (size) {
        case "small":
            return 40
        case "medium":
            return 50
        case "large":
            return 60
        default:
            40;
    }
}

export const formatDate = (dateString: string) => {

    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
}
