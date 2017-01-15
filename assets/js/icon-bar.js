(function toggleNav(){

    const nav = document.getElementById('nav');

    nav.addEventListener('click', toggleClass);

    function toggleClass(e){
        const el = e.target;

        const selected = document.querySelector('.nav-selected');

        if (selected) {
            selected.classList.remove('nav-selected');
        }

        if (el && el.nodeName == 'A') {
            el.parentElement.classList.add('nav-selected');
        } else if (el && el.nodeName == 'I') {
            el.parentElement.parentElement.classList.add('nav-selected');
        }


    }


})();
