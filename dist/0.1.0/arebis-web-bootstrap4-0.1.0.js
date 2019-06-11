/////////////////////////////////////////////////////////////////////////////////
/// Arebis Web BOOTSTRAP 4 Extensions 1.0 - (c) Rudi Breedenraedt             ///
/////////////////////////////////////////////////////////////////////////////////

/// Globals:

/// Document Ready handler:
$(document).ready(function () {

    /// Set focus on 'autofocus' element in modal when modal is shown.
    $(document.body).on("shown.bs.modal", function (event) {
        $(event.target).find("*[autofocus]:first").each(function () {
            // Delay with 300ms fixes issue on some IE versions that cursor blinks above input field when modal has fade effect.
            var item = $(this)[0];
            setTimeout(function () {
                item.focus();
                item.select();
            }, 300);
        });
    });

    $(document.body).on("hidden.bs.modal", ".modal[onclose-reset=':content']", function (event) {
        $(this).html($(this)[0]._rb_onCloseResetContent);
    });
});

rbLoaderExtensions.push(function (loaded) {
    $(loaded).find(".modal[onclose-reset=':content']").each(function (index, elem) {
        $(this)[0]._rb_onCloseResetContent = $(this).html();
    });
});
