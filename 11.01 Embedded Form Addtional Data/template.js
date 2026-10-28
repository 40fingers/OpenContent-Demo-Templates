$(document).ready(function () {
  initPage(document);
});

const initPage = function (element) {
  var sf = $.ServicesFramework(moduleId);

var $submitButton = $('#submit-' + moduleId);
var $contactForm = $('.contactform');

var form = $contactForm.openContentForm({
    servicesFramework: sf,
    onSubmit: function (data) {
        data.Title = itemTitle;
    },
    onSubmited: function (data) {
        form.destroy();                    
if (data.errors && data.errors.length) {
            $contactForm.text(data.errors.join(", "));
        } else {
            $contactForm.text(data.message);
        }
        $submitButton.hide();
        //$modal.modal('hide');
    }
});
$submitButton.click(function () {
    form.submit(itemId);
});
}