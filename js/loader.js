/* loader.js */
(function () {

    const loader = document.querySelector("[data-loader]");
    if (!loader) return;

    let hidden = false;

    function hideLoader() {

        if (hidden) return;
        hidden = true;

        loader.classList.add("loader-hidden");
        document.body.classList.remove("is-loading");

        setTimeout(() => {
            loader.remove();
        }, 700);

    }

    window.addEventListener("load", () => {
        setTimeout(hideLoader, 700);
    });

    setTimeout(hideLoader, 4000);

})();