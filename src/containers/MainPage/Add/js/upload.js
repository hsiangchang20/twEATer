import Imgur from './imgur'

var feedback = function(res) {
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        console.log(get_link)
        document.querySelector('.status').classList.add('bg-success');
        document.querySelector('.status').innerHTML =
            '<img class="img" alt="Imgur-Upload" src=\"' + get_link + '\"/>';
    }
};

new Imgur({
    clientid: 'c61f0a8cc317dc8', //You can change this ClientID
    callback: feedback
});
