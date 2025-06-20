/* eslint-disable max-len */
function wrapInMediaQuery(node) {
    return (
        '@media (hover: hover), (-moz-touch-enabled: 0), (-ms-high-contrast: none), (-ms-high-contrast: active) {' +
        node +
        '}'
    );
}

const plugin = function () {
    return {
        postcssPlugin: 'postcss-require-hover',
        Once(root) {
            root.walkRules(function (rule) {
                if (rule.selector.indexOf(':hover') !== -1) {
                    var clone = rule.clone();
                    var hoverSelectors = [];

                    var selectors = rule.selectors.filter(function (selector) {
                        if (selector.indexOf(':hover') !== -1) {
                            hoverSelectors.push(selector);
                            return false;
                        }
                        return true;
                    });

                    if (selectors.length > 0) {
                        clone.selectors = hoverSelectors;
                        rule.selectors = selectors;
                        rule.parent.prepend(wrapInMediaQuery(clone));
                    } else {
                        rule.replaceWith(wrapInMediaQuery(clone));
                    }
                }
            });
        }
    };
};
plugin.postcss = true;

module.exports = plugin;
