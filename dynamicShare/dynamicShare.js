import Share from 'ninelines-sharing';
import html2canvas from 'html2canvas';

const init = (container) => {
    let $document = $(document);

    function shareResult(social, $this) {
        let shareWindow = Share.openWindow('');

        let $shareBlock = $('.share-container'); // Блок который будет шерится, все параметры размеров в стилях прописывать в px

        html2canvas($shareBlock.get(0), {
            logging: false,
            scrollY: 0,
        })
            .then((canvas) => {
                let image = canvas.toDataURL('image/png');
                $.ajax({
                    type: 'post',
                    url: '/ajax/save-poster.php',
                    data: {
                        image,
                    },
                    dataType: 'json',
                    success(response) {
                        if (!response || !response.image) {
                            shareWindow.close();

                            return;
                        }

                        let url = `${location.origin}/share.php?page=result&image=${response.image}`;

                        shareWindow.location = {
                            facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                            vk: `https://vk.com/share.php?url=${encodeURIComponent(url)}`,
                            twitter: `http://twitter.com/share?url=${encodeURIComponent(url)}`,
                        }[social];
                    },
                });
            });
    }

    $document.on('click', '.share-test__btn', (event) => {
        let social = event.currentTarget.dataset.socials;

        let $this = $(event.currentTarget);

        shareResult(social, $this);
    });
};

export default {
    init,
}
