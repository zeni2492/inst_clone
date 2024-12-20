export const getSubscribers = async (url: string, id: number) => {
    // Append the id as a query parameter in the URL
    try {
        const requestUrl = `${url}/${id}`;

        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getSubscriptions = async (id: number) => {
    const requestUrl = `http://localhost:2492/api/social/getSubscriptions/${id}`;

    try {
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.log(error);
    }
};
