/**
 * AHS Oral History — Transcript Player & Citation Generator
 */

(function () {
    'use strict';

    // ---------- Citation Generator ----------

    function initCitationGenerator() {
        var wrapper = document.getElementById('citation-generator');
        var tabs = document.querySelectorAll('.citation-tab');
        var textEl = document.getElementById('citation-text');
        var copyBtn = document.getElementById('copy-citation');

        if (!wrapper || !tabs.length || !textEl) return;

        var raw = wrapper.getAttribute('data-citation');
        if (!raw) return;

        var meta;
        try { meta = JSON.parse(raw); } catch (e) { return; }

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) { t.classList.remove('active'); });
                tab.classList.add('active');
                textEl.textContent = formatCitation(tab.dataset.format, meta);
            });
        });

        if (copyBtn) {
            copyBtn.addEventListener('click', function () {
                var text = textEl.textContent;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(function () {
                        showCopiedToast(copyBtn);
                    });
                }
            });
        }

        // Initial render
        textEl.textContent = formatCitation('chicago', meta);
    }

    function formatCitation(format, meta) {
        // Split "Firstname Lastname" into parts
        var name = meta.name || '';
        var parts = name.split(' ');
        var lastName = parts.length > 1 ? parts[parts.length - 1] : name;
        var firstName = parts.length > 1 ? parts.slice(0, -1).join(' ') : '';
        var firstInitial = firstName ? firstName.charAt(0) + '.' : '';

        var interviewer = meta.interviewer || '';
        var date = meta.date || '';
        var url = meta.url || '';
        var project = meta.project || 'Oral History Project';

        // Parse date for APA/MLA formatting
        var dateObj = date ? new Date(date) : null;
        var year = dateObj && !isNaN(dateObj) ? dateObj.getFullYear() : '';

        // MLA short month
        var mlaMonths = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
        var mlaDate = '';
        if (dateObj && !isNaN(dateObj)) {
            mlaDate = dateObj.getDate() + ' ' + mlaMonths[dateObj.getMonth()] + ' ' + dateObj.getFullYear();
        }

        // APA date: (year, Month day)
        var apaMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var apaDate = '';
        if (dateObj && !isNaN(dateObj)) {
            apaDate = dateObj.getFullYear() + ', ' + apaMonths[dateObj.getMonth()] + ' ' + dateObj.getDate();
        }

        switch (format) {
            case 'chicago':
                // LastName, FirstName. Interview by Interviewer. Project, Date. URL.
                return (firstName ? lastName + ', ' + firstName : name) + '. '
                    + (interviewer ? 'Interview by ' + interviewer + '. ' : '')
                    + project + (date ? ', ' + date : '') + '. '
                    + url + '.';

            case 'mla':
                // LastName, FirstName. Interview. Project, MLA date, URL.
                return (firstName ? lastName + ', ' + firstName : name) + '. '
                    + 'Interview. '
                    + project + (mlaDate ? ', ' + mlaDate : '') + ', '
                    + url + '.';

            case 'apa':
                // LastName, F. (Year, Month Day). Interview [Audio recording]. Project. URL
                return (firstName ? lastName + ', ' + firstInitial : name) + ' '
                    + (apaDate ? '(' + apaDate + '). ' : '')
                    + 'Interview [Audio recording]. '
                    + project + '. '
                    + url;

            default:
                return '';
        }
    }

    function showCopiedToast(btn) {
        var original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () {
            btn.textContent = original;
        }, 2000);
    }

    // ---------- Init ----------

    document.addEventListener('DOMContentLoaded', function () {
        initCitationGenerator();
    });
})();
