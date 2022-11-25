function createAnalytics() {
    let counter = 0;
    let isDestroyed = false;

    let listener = () => counter++;
    document.addEventListener("click", listener);

    return {
        destroy() {
            document.removeEventListener("click", listener);
            isDestroyed = true;
        },

        getClick() {
            if (isDestroyed) {
                return `Analytics is destroy. Total clicks ${counter}`;
            } else {
                return counter;
            }
        },
    };
}

window.analytics = createAnalytics();
