/////////////////////////////////////////////////////////////////////////////////
/// Arebis Web Extensions 1.0 - (c) Rudi Breedenraedt                         ///
/////////////////////////////////////////////////////////////////////////////////

var __rb_eventactionfx = {
    onclickShow: function (event) {
        var selector = $(this).attr("onclick-show");
        var target = $(selector);
        target.removeClass(__rb.hiddenClass);
    },
    ifcheckedShow: function () {
        var selector = $(this).attr("ifchecked-show");
        var target = $(selector);
        if ($(this).prop("checked")) {
            target.removeClass(__rb.hiddenClass);
        } else {
            target.addClass(__rb.hiddenClass);
        }
    },
    ifcheckedHide: function () {
        var selector = $(this).attr("ifchecked-hide");
        var target = $(selector);
        if ($(this).prop("checked")) {
            target.addClass(__rb.hiddenClass);
        } else {
            target.removeClass(__rb.hiddenClass);
        }
    },
};

/// Document Ready handler:
$(document).ready(function () {

    /// <* onclick-show="selector"> On click, removes the hidden class of the selected element.
    $(document.body).on("click", "*[onclick-show]", __rb_eventactionfx.onclickShow);

    /// <* onclick-hide="selector"> On click, adds the hidden class of the selected element.
    $(document.body).on("click", "*[onclick-hide]", function (event) {
        var selector = $(this).attr("onclick-hide");
        var target = $(selector);
        target.addClass(__rb.hiddenClass);
    });

    /// <* onclick-toglleclass="class"> On click, toggles the given class on the current element.
    $(document.body).on("click", "*[onclick-toglleclass]", function (event) {
        var attrvalues = $(this).attr("onclick-toglleclass").split(" on ");
        var clss = attrvalues[0];
        var target = (attrvalues.length > 1) ? $(attrvalues[1]) : $(this);
        target.toggleClass(clss);
    });

    /// <* ondblclick-show="selector"> On dblclick, removes the hidden class of the selected element.
    $(document.body).on("dblclick", "*[ondblclick-show]", function (event) {
        var selector = $(this).attr("ondblclick-show");
        var target = $(selector);
        target.removeClass(__rb.hiddenClass);
    });

    /// <* ondblclick-hide="selector"> On dblclick, adds the hidden class of the selected element.
    $(document.body).on("dblclick", "*[ondblclick-hide]", function (event) {
        var selector = $(this).attr("ondblclick-hide");
        var target = $(selector);
        target.addClass(__rb.hiddenClass);
    });

    /// <* ondblclick-toglleclass="class"> On dblclick, toggles the given class on the current element.
    $(document.body).on("dblclick", "*[ondblclick-toglleclass]", function (event) {
        var attrvalues = $(this).attr("ondblclick-toglleclass").split(" on ");
        var clss = attrvalues[0];
        var target = (attrvalues.length > 1) ? $(attrvalues[1]) : $(this);
        target.toggleClass(clss);
    });

    /// <* onhover-display="selector"> On hover, displays elements matching the given selector.
    $(document.body).on("mouseenter", "*[onhover-display]", function (event) {
        var target = $($(this).attr("onhover-display"));
        target.removeClass(__rb.hiddenClass);
    }); $(document.body).on("mouseleave", "*[onhover-setclass]", function (event) {
        var target = $($(this).attr("onhover-display"));
        target.addClass(__rb.hiddenClass);
    });

    /// <* onhover-setclass="class"> On hover, sets the given class on the element.
    $(document.body).on("mouseenter", "*[onhover-setclass]", function (event) {
        var attrvalues = $(this).attr("onhover-setclass").split(" on ");
        var clss = attrvalues[0];
        var target = (attrvalues.length > 1) ? $(attrvalues[1]) : $(this);
        target.addClass(clss);
    }); $(document.body).on("mouseleave", "*[onhover-setclass]", function (event) {
        var attrvalues = $(this).attr("onhover-setclass").split(" on ");
        var clss = attrvalues[0];
        var target = (attrvalues.length > 1) ? $(attrvalues[1]) : $(this);
        target.removeClass(clss);
    });

    /// <form onsubmit-disable=":submit"> Prevents submitting the form twice.
    $(document.body).on("submit", "FORM[onsubmit-disable=':submit']", function (event) {
        $(this).find("INPUT[type=submit], INPUT[type=reset], INPUT[type=image], BUTTON").each(function (index) {
            $(this).prop('disabled', true);
        });
    });

    /// <form onsubmit-hide="selector"> On submit, adds the hidden class to the selected element.
    $(document.body).on("submit", "FORM[onsubmit-hide]", function (event) {
        // Find closest match to selector:
        var selector = $(this).attr("onsubmit-hide");
        var target = $(this).find(selector);
        if (!target.length) target = $(selector);
        // Perform action:
        target.addClass(__rb.hiddenClass);
    });

    /// <form onsubmit-show="selector"> On submit, removes the hidden class of the selected element.
    $(document.body).on("submit", "FORM[onsubmit-show]", function (event) {
        // Find closest match to selector:
        var selector = $(this).attr("onsubmit-show");
        var target = $(this).find(selector);
        if (!target.length) target = $(selector);
        // Perform action:
        target.removeClass(__rb.hiddenClass);
    });

    /// <* onchange-set="inputname"> On input, flags the form dirty.
    $(document.body).on("input change", "FORM[onchange-set]", function (event) {
        __rb.markFormChanged($(this));
    });

    /// <* onchange-submit=":form"> triggers form submission on change.
    $(document.body).on("change", "*[onchange-submit=':form']", function (event) {
        var form = $(this).closest('form');
        var inlineTarget = $(this).attr("inline-target");
        var formaction = $(this).attr("formaction");
        if ($(this)[0] !== form[0] && (inlineTarget || formaction)) {
            var method = (form.attr("method") || "GET").toUpperCase();
            var href = $(this).attr("formaction") || form.attr("action") || "";
            var target = $(this).attr("target") || form.attr("target") || null;
            __rb.submitInline(event, $(this), form, method, href, target, inlineTarget, false, null);
        } else {
            form.submit();
        }
    });

    /// <* ifchecked-show="selector"> If checked, shows the selector matches. If unchecked, hides them.
    $(document.body).on("change", "INPUT[ifchecked-show]", __rb_eventactionfx.ifcheckedShow);

    /// <* ifchecked-hide="selector"> If checked, hides the selector matches. If unchecked, shows them.
    $(document.body).on("change", "INPUT[ifchecked-hide]", __rb_eventactionfx.ifcheckedHide);
});

rbLoaderExtensions.push(function (loaded) {
    $(loaded).find("INPUT[ifchecked-show]").each(__rb_eventactionfx.ifcheckedShow);
    $(loaded).find("INPUT[ifchecked-hide]").each(__rb_eventactionfx.ifcheckedHide);
});

