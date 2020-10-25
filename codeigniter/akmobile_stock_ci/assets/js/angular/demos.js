function getDemoTheme() {
    var theme = document.body ? ngWidgets.data(document.body, 'theme') : null
    if (theme == null) {
        theme = '';
    }
    else {
        return theme;
    }
    var themestart = window.location.toString().indexOf('?');
    if (themestart == -1) {
        return '';
    }

    var theme = window.location.toString().substring(1 + themestart);
    if (theme.indexOf('(') >= 0)
    {
        theme = theme.substring(1);
    }
    if (theme.indexOf(')') >= 0) {
        theme = theme.substring(0, theme.indexOf(')'));
    }
    if (theme.indexOf('&') >= 0) {
        theme = theme.substring(0, theme.indexOf('&'));
    }

    var url = "../../ngwidgets/styles/ngx." + theme + '.css';

    if (document.createStyleSheet != undefined) {
        var hasStyle = false;
        ngWidgets.each(document.styleSheets, function (index, value) {
            if (value.href != undefined && value.href.indexOf(theme) != -1) {
                hasStyle = true;
                return false;
            }
        });
        if (!hasStyle) {
            document.createStyleSheet(url);
        }
    }
    else {
        var hasStyle = false;
        if (document.styleSheets) {
            ngWidgets.each(document.styleSheets, function (index, value) {
                if (value.href != undefined && value.href.indexOf(theme) != -1) {
                    hasStyle = true;
                    return false;
                }
            });
        }
        if (!hasStyle) {
            var link = ngWidgets('<link rel="stylesheet" href="' + url + '" media="screen" />');
            link[0].onload = function () {
                if (ngWidgets.ngx && ngWidgets.ngx.ready) {
                    ngWidgets.ngx.ready();
                    link[0].onload = null;
                };
            }
            ngWidgets(document).find('head').append(link);
        }
    }
    ngWidgets.ngx = ngWidgets.ngx || {};
    ngWidgets.ngx.theme = theme;
    return theme;
};
var theme = '';
try
{
    if (ngWidgets) {
        theme = getDemoTheme();
        if (window.location.toString().indexOf('file://') >= 0) {
            var loc = window.location.toString();
            var addMessage = false;
            if (loc.indexOf('grid') >= 0 || loc.indexOf('chart') >= 0 || loc.indexOf('tree') >= 0 || loc.indexOf('list') >= 0 || loc.indexOf('combobox') >= 0 || loc.indexOf('php') >= 0 || loc.indexOf('adapter') >= 0 || loc.indexOf('datatable') >= 0 || loc.indexOf('ajax') >= 0) {
                addMessage = true;
            }

            if (addMessage) {
                ngWidgets(document).ready(function () {
                    setTimeout(function () {
                        ngWidgets(document.body).prepend(ngWidgets('<div style="font-size: 12px; font-family: Verdana;">Note: To run a sample that includes data binding, you must open it via "http://..." protocol since Ajax makes http requests.</div><br/>'));
                    }
                    , 50);
                });
            }
        }
    }
    else {
        ngWidgets(document).ready(function () {
            theme = getDemoTheme();
        });
    }
}
catch (error) {
    var er = error;
}