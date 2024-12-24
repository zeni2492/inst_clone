export const getSocialStats = async (url: string, id?: number) => {
    const requestUrl = `${url}/${id}`;

    try {
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};
