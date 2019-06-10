/////////////////////////////////////////////////////////////////////////////////
/// Arebis Web Extensions 1.0 - (c) Rudi Breedenraedt                         ///
/////////////////////////////////////////////////////////////////////////////////

/// Globals:
var __rb = {};
__rb.html_spinner = '<i class="fas fa-circle-notch fa-spin"></i> ';
__rb.hiddenClass = 'hidden';
__rb.getDialog = function (item) { return $(item).closest('.modal'); };
__rb.closeDialog = function (item) { var dlg = __rb.getDialog(item); if (dlg.length) dlg.modal('hide'); };
__rb.openDialog = function (item) { var dlg = __rb.getDialog(item); if (dlg.length) dlg.modal('show'); };
__rb.submitInline = function (event, triggerElement, form, method, href, target, inlineTarget, inlineCached, hist) {
    if (inlineTarget) {
        if (inlineCached) {
            $(".contextmenu").css("display", "none"); // Hides context menu's first
            window.history.replaceState({ inlineRestore: true, inlineTarget: inlineTarget, inlineHtml: $(inlineTarget).html() }, document.title, window.location.href);
        }
        if (method == "GET" && form != null) href = (href.indexOf('?') >= 0) ? href + '&' + form.serialize() : href + '?' + form.serialize();
        $.ajax({
            url: href,
            cache: false,
            data: (method == "GET") ? null : form.serialize(),
            method: method,
            statusCode: {
                200: function (data, textStatus, jqXHR) { // OK
                    if (hist == "push")
                        window.history.pushState(null, document.title, href);
                    else if (hist == "set")
                        window.history.replaceState(null, document.title, href);
                    $(inlineTarget).html(data);
                    $(inlineTarget).find("*[inline-target=local]").each(function () { $(this).attr('inline-target', inlineTarget); });
                    $(inlineTarget).loaded();
                    // If in dialog, open it:
                    __rb.openDialog(inlineTarget);
                },
                204: function (data, textStatus, jqXHR) { // No Content
                    $(inlineTarget).html("");
                    // If in dialog, close it:
                    __rb.closeDialog(inlineTarget);
                },
                205: function (data, textStatus, jqXHR) { // Reset Content
                    var location = jqXHR.getResponseHeader("Location") || window.location.href;
                    window.history.replaceState(null, document.title, location);
                    window.location.href = location;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(inlineTarget).html("<div>" + jqXHR.responseText + "</div>");
                // If in dialog, open it:
                __rb.openDialog(inlineTarget);
                // Throw error:
                throw ("Error " + jqXHR.status + " - " + jqXHR.statusText);
            },
        });
        event.preventDefault();
    } else if (target) {
        window.open(href, target);
        event.preventDefault();
        return;
    } else {
        window.location = href;
        event.preventDefault();
        return;
    };
};
__rb.markFormChanged = function (form) {
    if (form == null) return;
    var inputname = form.attr("onchange-set");
    var target = form.find("INPUT[name='" + inputname + "']");
    // Perform action:
    if (target.length > 0) {
        $(target).each(function (index, item) {
            if ($(item).attr('type') == 'checkbox') {
                $(item).prop("checked", true);
            } else {
                $(item).val("true");
            }
        });
    }
    form.addClass("form-changed");
};

/// Document Ready handler:
$(document).ready(function () {

    ////// Pre-execution events:
    ////// (Requires and element with id="pre-execute" inside the document body.)
    //#region

    /// Buttons and link can have a confirmation dialog;
    /// <a href="http://www.example.com" confirm-message="Are you sure ?">...</a>
    $(document.getElementById("pre-execute")).on("click", "*[confirm-message]", function (event) {
        var confirmMessage = $(this).attr("confirm-message");
        if (confirmMessage) {
            if (!confirm(confirmMessage)) {
                event.stopPropagation();
                event.preventDefault();
            }
        }
    });

    //#endregion

    ////// Execution and Post-execution events:
    //#region

    /// On click link:
    $(document.body).on("click", "*[href]", function (event) {
        var elementName = $(this)[0].tagName;
        var href = $(this).attr("href");
        if (href == "null" || href == "") {
            event.preventDefault();
            return;
        } else if (href == "history:back") {
            window.history.back();
            event.preventDefault();
            return;
        } else if (href == "location:reload") {
            location.reload();
            event.preventDefault();
            return;
        } else if (href.indexOf("alert:") == 0) {
            alert(href.substr(6));
            event.preventDefault();
            return;
        }
        var target = $(this).attr("target");
        var inlineTarget = $(this).attr("inline-target");
        var inlineCached = ($(this).attr("inline-cached") || "false").toLowerCase() == "true";
        var hist = ($(this).attr("history") || "default").toLowerCase();

        if (inlineTarget) {
            // If in dialog, open it:
            __rb.openDialog(inlineTarget);
            // Submit inline:
            __rb.submitInline(event, $(this), null, "GET", href, target, inlineTarget, inlineCached, hist);
            return;
        }
        if (hist == "set") window.history.replaceState(null, document.title, href);
        if (elementName == 'A') {
            return; // navigate link through default behavior
        } else if (target /* and element is not 'A' */) {
            window.open(href, target);
            event.preventDefault();
            return;
        } else {
            window.location = href;
            event.preventDefault();
            return;
        }
    });

    $(document.body).on("click", "FORM BUTTON[type=submit][inline-target]", function (event) {
        var form = $(this).closest('form');
        var method = (form.attr("method") || "GET").toUpperCase();
        var href = $(this).attr("formaction") || form.attr("action") || "";
        var target = null; // Known to have inline-target which overrides target anyway
        var inlineTarget = $(this).attr("inline-target");
        // Mark form changed:
        __rb.markFormChanged(form);
        // Submit inline:
        __rb.submitInline(event, $(this), form, method, href, target, inlineTarget, false, null);
        return;
    });

    /// On submit form:
    $(document.body).on("submit", "FORM", function (event) {
        var form = $(this).closest('form');
        var method = (form.attr("method") || "GET").toUpperCase();
        var href = form.attr("action") || "";
        var target = null; // If no inline-target, then default behavior will see target.
        var inlineTarget = $(this).attr("inline-target");
        var inlineCached = ($(this).attr("inline-cached") || "false").toLowerCase() == "true";
        var hist = ($(this).attr("history") || "default").toLowerCase();
        if (inlineTarget) {
            // Submit inline:
            __rb.submitInline(event, $(this), form, method, href, target, inlineTarget, inlineCached, hist);
            return;
        } else {
            if (hist == "set") window.history.replaceState(null, document.title, href);
            return; // submit form through default behavior
        }
    });

    /// On browser back:
    window.onpopstate = function (event) {
        // When going back after an inline target, an explicit reload is required:
        if (event.state != null && event.state.inlineRestore == true) {
            $(event.state.inlineTarget).html(event.state.inlineHtml);
            $(event.state.inlineTarget).loaded();
        }
        else if (event.state == null) {
            window.location = window.location;
        }
    };

    /// Show spinner in executing button:
    $(document.body).on("click", "BUTTON", function (event) {
        $(this).find(".spinner").replaceWith(__rb.html_spinner);
    });

    /// Fix for posting inline-target forms by submit button with custom formaction:
    $(document.body).on("click", "FORM[inline-target] BUTTON[type=submit][formaction]", function (event) {
        var form = $(this).closest("FORM");
        form.attr("action", $(this).attr("formaction"));
        form.submit();
        event.preventDefault();
    });

    /// Support for forwarding click events. I.e. a click on the div will be translated into
    /// a click on the link:
    ///
    ///   <div forward-click="#a1">Click me!</div>
    ///   <a id="a1" href="http://www.example.com/">...</a>
    ///
    $(document.body).on('click', "*[forward-click]", function (event) {
        $($(this).attr("forward-click"))[0].click(); // See: http://goo.gl/lGftqn
        event.preventDefault();
    });

    /// Disable ENTER key to submit forms. I.e. useful when multiple submit buttons and first
    /// one is not necessarily the default one.
    /// I.e:
    ///   <form default-submit-button="#save-button" method="post">...</form>
    $(document.body).on("keydown", "FORM[default-submit-button]", function (event) {
        if (event.keyCode == 13) {
            var target = $(this).find($(this).attr("default-submit-button"))[0];
            if (target != null) target.click(); // See: http://goo.gl/lGftqn
            event.preventDefault();
        }
        else if (event.keyCode == 27) {
            var target = $(this).find($(this).attr("default-cancel-button"))[0];
            if (target != null) target.click(); // See: http://goo.gl/lGftqn
            event.preventDefault();
        }
    });

    ///// Select all text when element gets focus:
    //$(document.body).on("focus", "INPUT[type=text] INPUT[type=number] INPUT[type=email]", function (event) {
    //    $(this)[0].select();
    //});

    //#endregion

    /// Perform the loaded() function now the whole body is loaded:
    $(document.body).loaded();

});

/// Loaded extension to be executed on lazy loaded DOM objects:
var rbLoaderExtensions = [];
jQuery.fn.extend({

    /// Defines a "loaded()" function to be called after dynamically loading HTML parts:
    loaded: function () {

        // **** KEEP AS FIRST ****
        // For any element having a 'moveto': moves the content HTML to the given selector.
        $(this).find("*[moveto]").each(function () {
            $($(this).attr("moveto")).html($(this).html());
            $($(this).attr("moveto")).loaded();
            $(this).html('');
        });

        //#region "Document transformation on loaded"

        /// Show/hide parts after load:
        $(this).find(".showafterload").removeClass("hidden");
        $(this).find(".hideafterload").addClass("hidden");

        /// For any element having a 'autoload-url': load the given URL:
        /// Optionally, a 'autoload-refresh' indicates the time (in seconds) after which to continuously refresh the content.
        /// The url can contain a "{rnd}" literal that will then be replaced by a random number to force reloading.
        /// I.e: <div autoload-url="/Home/Index/?x={rnd}" autoload-refresh="10"></div>
        $(this).find('*[autoload-url]').each(function () {
            var url = $(this).attr("autoload-url") + '';
            var loadRefresh = $(this).attr("autoload-refresh");
            var target = $(this);
            target.load(url.replace('{rnd}', Math.random()), function () { $(this).loaded(); });
            if (loadRefresh) {
                window.setInterval(function () { target.load(url.replace('{rnd}', Math.random()), function () { $(this).loaded(); }); }, loadRefresh * 1000);
            }
        });

        /// Fix autofocus for lazy-loaded html:
        $(this).find("*[autofocus]:first").each(function (index) {
            $(this)[0].focus();
            $(this)[0].select();
        });

        /// Execute loader extensions:
        var loaderScope = $(this);
        $.each(rbLoaderExtensions, function (index, value) {
            value(loaderScope);
        });

        //#endregion

        //#region "Adding event handlers"

        // Add handler on parent of a .contextmenu element to show/hide context menu:
        $(this).find(".contextmenu").each(function () {
            var cm = $(this);
            var target = $($(this).attr('contextmenu-for'));
            if (target.length == 0) target = $(this).parent();
            target.on("contextmenu", function (event) {
                // Hides any currently visible context menu:
                var wasVisible = false;
                $(".contextmenu").each(function () {
                    if ($(this).css("display") != "none") {
                        $(this).css("display", "none");
                        wasVisible = true;
                    }
                });

                // If no context menu was currently visible, show current:
                if (!wasVisible) {
                    cm.css("top", (event.pageY - window.pageYOffset) + "px").css("left", (event.pageX - window.pageXOffset) + "px").css("position", "fixed").css("display", "block");
                }

                // Event is handled:
                event.stopPropagation();
                event.preventDefault();
            });
            target.on("click", function (event) {
                // On regular click, hide context menu:
                $(".contextmenu").each(function () {
                    if ($(this).css("display") != "none") {
                        $(this).css("display", "none");
                    }
                });
            });
        });

        //#endregion
    }
});
