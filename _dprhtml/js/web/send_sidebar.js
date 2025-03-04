'use strict';

const DPR_Web_Send_Sidebar = (function () {
  function eventSend(event, internal) {
    if (!event) return;
    if (event.ctrlKey || event.metaKey || event.which == 2) return true;
    if (event.shiftKey) return 'shift';
    if (event.which == 1 && internal) return 'internal';
    if (event.which == 1) return false;
    if (event.keyCode) return false;
    return 'right';
  }

  async function importXML(section, labelsearch, para, isPL, add, scroll, cat) {

    const sectionId = DPR_Chrome.getPrimarySectionId()

    var nikaya = document.getElementById('nav-set').value;
    var bookno = parseInt(document.getElementById('nav-book').value) - 1;

    var sutta = 'x', vagga = 'x', volume = 'x', meta = 'x';

    if (section === false) section = 'x';

    //alert(cat);

    if (!cat) cat = 6;



    switch (cat) {
      case 6:
        if (section == 'x') {
          section = $('#nav-section option:selected').index();
        }
      case 5:
        sutta = $('#nav-sutta option:selected').index();
      case 4:
        vagga = $('#nav-vagga option:selected').index();
      case 3:
        volume = $('#nav-volume option:selected').index();
      case 2:
        meta = $('#nav-meta option:selected').index();
        break;
      default:
        break;
    }


    if (DPR_G.G_hier == 't' && DPRNav.limitt()) {
      DPR1_format_mod.alertFlash('Ṭīkā not available for ' + DPR_G.G_nikLongName[document.getElementById('set').value] + '.', 'RGBa(255,0,0,0.8)');
      return;
    }
    if (DPR_G.G_hier == 'a' && nikaya == 'g') {
      DPR1_format_mod.alertFlash('Atthakatha not available for grammar.', 'RGBa(255,0,0,0.8)');
      return;
    }
    if (DPR_G.G_hier == 'a' && nikaya == 'b') {
      DPR1_format_mod.alertFlash('Atthakatha not available for Abhidh-s.', 'RGBa(255,0,0,0.8)');
      return;
    }

    const loadXmlSectionParams = [nikaya, bookno, meta, volume, vagga, sutta, section, DPR_G.G_hier];
    appInsights.trackEvent({ name: 'Go to sutta(s)',  properties: { params: loadXmlSectionParams, }});

    if (!add) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
        await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace(loadXmlSectionParams), false, sectionId, labelsearch, para);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + bookno + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + DPR_G.G_hier + (labelsearch ? '&query=' + labelsearch.join('+') : '') + (para ? '&para=' + para : '') + (scroll ? '&scroll=' + scroll : ''));
        DPRChrome.openDPRTab(permalink, 'DPR-main');
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace(loadXmlSectionParams), false, sectionId, labelsearch, para);
      }
    }
    else if (add == 'shift') {
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
        await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace(loadXmlSectionParams));
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + bookno + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + DPR_G.G_hier + (labelsearch ? '&query=' + labelsearch.join('+') : '') + (para ? '&para=' + para : '') + (scroll ? '&scroll=' + scroll : ''));
        DPR1_chrome_mod.openDPRTab(permalink, 'DPR-main');
        return;
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace(loadXmlSectionParams));
      }
    }
    else {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + bookno + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + DPR_G.G_hier + (labelsearch ? '&query=' + labelsearch.join('+') : '') + (para ? '&para=' + para : '') + (scroll ? '&scroll=' + scroll : ''));
      DPRChrome.openDPRTab(permalink, 'DPRm');
    }
  }

  async function importXMLindex(sectionId, add) {
    var nikaya = document.getElementById('nav-set').value;
    var bookno = parseInt(document.getElementById('nav-book').value) - 1;

    const loadXmlIndexParams = [nikaya, bookno, DPR_G.G_hier];
    appInsights.trackEvent({ name: 'Go to index',  properties: { params: loadXmlIndexParams, }});

    if (!add) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
        await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace(loadXmlIndexParams), false, sectionId);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');

      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + bookno + '.' + DPR_G.G_hier);
        DPRChrome.openDPRTab(permalink, 'DPR-main');
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace(loadXmlIndexParams), false, sectionId);
      }
    }
    else if (add == 'shift') {
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
        await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace(loadXmlIndexParams));
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + bookno + '.' + DPR_G.G_hier);
        DPR1_chrome_mod.openDPRTab(permalink, 'DPR-main');
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace(loadXmlIndexParams));
      }
    }
    else {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + bookno + '.' + DPR_G.G_hier);
      DPRChrome.openDPRTab(permalink, 'DPRm');
    }
  }

  async function openPlace(sectionId, [nikaya, book, meta, volume, vagga, sutta, section, hiert], para, stringra, add) {
    if (!nikaya || add == 'right') return;

    if (stringra) {
      stringra = stringra.replace(/`/g, '"');
      stringra = stringra.split('#');
      if (DPR_G.G_searchRX == 'true') {
        for (var i in stringra) { stringra[i] = new RegExp(stringra[i]); }
      }
    }
    if (!add) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
        await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya, book, meta, volume, vagga, sutta, section, hiert]), false, sectionId, stringra, para);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (stringra ? '&query=' + DPR_translit_mod.toVel(stringra.join('+')) : '') + (para ? '&para=' + (para + 1) : ''));
        DPRChrome.openDPRTab(permalink, 'DPR-main');
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya, book, meta, volume, vagga, sutta, section, hiert]), false, sectionId, stringra, para);
      }
    }
    else if (add == 'shift') {
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
        await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya, book, meta, volume, vagga, sutta, section, hiert]));
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (stringra ? '&query=' + DPR_translit_mod.toVel(stringra.join('+')) : '') + (para ? '&para=' + (para + 1) : ''));
        DPR1_chrome_mod.openDPRTab(permalink, 'DPR-main');
        return;
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya, book, meta, volume, vagga, sutta, section, hiert]));
      }
    }
    else {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (stringra ? '&query=' + DPR_translit_mod.toVel(stringra.join('+')) : '') + (para ? '&para=' + (para + 1) : ''));
      DPRChrome.openDPRTab(permalink, 'DPRm');
    }
  }

  async function openIndex(sectionId, [nikaya, book, hiert], add) {

    if (!nikaya || add == 'right') return;
    if (!add) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
        await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya, book, hiert]), false, sectionId);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + hiert);
        DPRChrome.openDPRTab(permalink, 'DPR-main');
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya, book, hiert]), false, sectionId);
      }
    }
    else if (add == 'shift') {
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
        await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya, book, hiert]));
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + hiert + '&compare=' + count);
        DPR1_chrome_mod.openDPRTab(permalink, 'DPR-main');
        return;
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya, book, hiert]));
      }
    }
    else {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + hiert);
      DPRChrome.openDPRTab(permalink, 'DPRm');
    }
  }

  async function sendQuickLinkOnEnterKey(event) {
    if(event.keyCode == 13) {
      await DPRSend.sendQuickLink(DPRSend.eventSend(event));
    }
  }

  async function sendQuickLink(add, value) {
    if (add == 'right') return;
    var ql = DPR_navigation_common_mod.convertShortLink($.trim($('#nav-quicklinks').val()));
    if (!ql)
      return;
    if (ql[0] === false) {
      return DPR_Chrome.showErrorToast(ql[1]);
    }

    appInsights.trackEvent({ name: 'Send quick link',  properties: { ql: ql, }});

    var nikaya = ql[0];
    var book = ql[1];
    var meta = ql[2];
    var volume = ql[3];
    var vagga = ql[4];
    var sutta = ql[5];
    var section = ql[6];
    var hiert = ql[7];

    var para = (ql[8] ? ql.pop() : null);

    const sectionId = DPR_Chrome.getPrimarySectionId()
    if (!add) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
        await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR1_send_mod.openPlace(sectionId, ql, para, null, add);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (para ? '&para=' + para : ''));
        DPRChrome.openDPRTab(permalink, 'DPR-main');
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR1_send_mod.openPlace(sectionId, ql, para, null, add);
      }
    }
    else if (add == 'shift') {
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
        await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR1_send_mod.openPlace(null, ql, para, null, add);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (para ? '&para=' + para : ''));
        DPR1_chrome_mod.openDPRTab(permalink, 'DPR-main');
        return;
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR1_send_mod.openPlace(null, ql, para, null, add);
      }
    }
    else {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (para ? '&para=' + para : ''));
      DPRChrome.openDPRTab(permalink, 'DPRm');
    }
  }

  async function sendAnalysisToOutput(sectionId, input, frombox, add) {
    appInsights.trackEvent({ name: 'Sidebar - DPR Analysis',  properties: { input, frombox, add, }});

    if (add == 'right') return;

    if (!add) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
        await thisTabBrowser.contentWindow.DPR1_analysis_function_mod.outputAnalysis(sectionId, input, frombox);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?analysis=' + DPR_translit_mod.toVel(input) + '&options=' + frombox);
        DPRChrome.openDPRTab(permalink, 'DPR-main');
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentWindow.DPR1_analysis_function_mod.outputAnalysis(sectionId, input, frombox);
      }
    }
    else {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?analysis=' + DPR_translit_mod.toVel(input) + '&frombox=' + frombox);
      DPRChrome.openDPRTab(permalink, 'DPRm');
    }
  }

  async function sendDict(hard, add, which, getstring, opts) {

    appInsights.trackEvent({ name: 'Search',  properties: { hard, add, which, getstring, opts, }});

    const sectionId = DPR_Chrome.getPrimarySectionId()

    if (add == 'right') return;
    if (!getstring) {
      var getstring = $('#dictin').prop("value");

      if (!hard) {
        if (getstring == DPR_G.G_lastsearch || getstring == '' || !DPR_G.DPR_prefs['autodict'] || $('#soregexp').prop("checked") || $('#sofulltext').prop("checked")) return;
      }

      DPR_G.G_lastsearch = getstring;

      var which = $('#dictType').prop("value");

      var opts = [];

      for (var i in DPR_G.G_nikToNumber) {
        if ($('#soNS' + i) && $('#soNS' + i).prop("checked")) opts.push('x' + i);
      }
      for (var i in DPR_G.G_hNumbers) {
        if ($('#soMAT' + i).prop("checked")) opts.push('m' + i);
      }

      if ($('#soregexp').prop("checked")) opts.push('rx');
      if ($('#sofuzzy').prop("checked")) opts.push('fz');
      if ($('#sofulltext').prop("checked")) opts.push('ft');
      if ($('#sostartword').prop("checked")) opts.push('sw');
      if (hard) opts.push('hd');

      if (hard)
        DPR_search_history_mod.saveDictHistory(getstring, which, opts.join(','));

    }
    if (which == 'DPR') {
      var text = DPR_translit_mod.toVel(getstring);

      await this.sendAnalysisToOutput(sectionId, text, (hard ? 1 : 2), add);
    }
    else {
      DPR_prefload_mod.saveDictionarySearchSettings(JSON.stringify({ type: which, query: getstring, opts: opts.join(','), entry: '', }))

      if (!add) { // reuse old tab
        var oldTab = DPRChrome.findDPRTab('DPR-dict');

        if (!oldTab) {
          if (!hard)
            return;
          var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/dict.htm' + '?type=' + which + '&query=' + encodeURIComponent(getstring) + '&opts=' + opts.join(','));
          DPRChrome.openDPRTab(permalink, 'DPR-dict');
        }
        else {
          DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
          var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
          await oldTabBrowser.contentWindow.DPR_dict_mod.startDictLookup(sectionId,which, getstring, opts);
        }
      }
      else if (hard) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/dict.htm' + '?type=' + which + '&query=' + encodeURIComponent(getstring) + '&opts=' + opts.join(','));
        DPRChrome.openDPRTab(permalink, 'DPRd');
      }
    }
  }

  async function sendSearchOnEnterKey(event) {
    if(event.keyCode == 13) {
      await DPRSend.sendSearch();
    }
  }

  async function sendSearch(add, searchType, searchString, searchMAT, searchSet, searchBook, searchPart, searchRX) {

    appInsights.trackEvent({ name: 'Search',  properties: { add, searchType, searchString, searchMAT, searchSet, searchBook, searchPart, searchRX, }});

    const sectionId = DPR_Chrome.getPrimarySectionId()

    if (add == 'right') return;

    if (!searchString) { // not direct from box

      var getstring = document.getElementById('isearch').value;
      if (!this.checkGetstring(getstring)) return;

      var which = $('#tipType option:selected').index();

      if (getstring == '_dev') { // Dev
        DPRChrome.openDPRTab(DPR_PAL.toWebUrl('chrome://digitalpalireader/content/dev.xul'), 'DPRd');
        return;
      }


      // get options

      if (which == 0 || which == 2) {
        var MAT = (document.getElementById('tsoMATm').checked ? 'm' : '') + (document.getElementById('tsoMATa').checked ? 'a' : '') + (document.getElementById('tsoMATt').checked ? 't' : '');
      }
      else var MAT = document.getElementById('tsoMAT2m').value;

      if (which == 0) { // get sets
        var sets = ''
        for (var i in DPR_G.G_nikToNumber) {
          if (document.getElementById('tsoCO' + i).checked) sets += i;
        }
      }
      else if (which == 5) {
        var sets = ''
        for (var i in 'dmsak') {
          if (document.getElementById('tsoCO' + 'dmsak'[i]).checked) sets += 'dmsak'[i];
        }
      }
      else var sets = document.getElementById('tsoSETm').value;

      if (which == 1) { // get books
        var book = [];
        if (DPR_G.nikvoladi[document.getElementById('tsoSETm').value]) {
          for (var i = 1; i <= DPR_G.nikvoladi[document.getElementById('tsoSETm').value].length; i++) {
            if (document.getElementById('tsoBObook' + i).checked) book.push(i);
          }
        }
        else {
          for (var i = 1; i <= DPR_G.nikvoladi[document.getElementById('tsoSETm').value + document.getElementById('tsoMAT2m').value].length; i++) {
            if (document.getElementById('tsoBObook' + i).checked) book.push(document.getElementById('tsoBObook' + i).getAttribute('data-value'));
          }
        }
        book = book.join(',');
      }
      else book = document.getElementById('tsoBOOKm').value;

      if (which == 3) { // get parts
        var part = document.getElementById('tsoPR').value - 1 + '.' + $('#tsoPmeta option:selected').index() + '.' + $('#tsoPvolume option:selected').index() + '.' + $('#tsoPvagga option:selected').index() + '.' + $('#tsoPsutta option:selected').index() + '.' + $('#tsoPsection option:selected').index();
      }
      else part = 1;


      var rx = document.getElementById('tsoRx').checked;

      DPR_search_history_mod.addSearchHistory(getstring, which, rx, sets, MAT, book, part);
    }
    else {
      var which = searchType;
      var getstring = searchString;
      var MAT = searchMAT;
      var sets = searchSet;
      var book = searchBook;
      var part = searchPart;
      var rx = searchRX;
    }

    DPR_prefload_mod.saveSearchSettings(JSON.stringify({ type: which, query: getstring, MAT, set: sets, book, part, rx }))

    if (!add) { // reuse old tab
      var oldTab = DPRChrome.findDPRTab('DPR-search');

      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/search.xul' + '?type=' + which + '&query=' + getstring + '&MAT=' + MAT + '&set=' + sets + '&book=' + book + '&part=' + part + '&rx=' + rx);
        DPRChrome.openDPRTab(permalink, 'DPR-search');
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentDocument.getElementById('dpr-search-browser').contentWindow.DPR1_search_mod.searchTipitaka(sectionId, which, getstring, MAT, sets, book, part, rx);
      }
    }
    else {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/search.xul' + '?type=' + which + '&query=' + getstring + '&MAT=' + MAT + '&set=' + sets + '&book=' + book + '&part=' + part + '&rx=' + rx);
      DPRChrome.openDPRTab(permalink, 'DPRs');
    }
  }

  function checkGetstring(getstring) {

    var stringra = [];

    var yesplus = getstring.indexOf('+');
    if (yesplus >= 0) {
      stringra = getstring.split('+');
    }
    if (getstring.length < 3) {
      DPR1_format_mod.alertFlash("Minimum three letter search length", 'yellow');
      $('#sbfb').html('<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>');
      $('#sbfa').html('');
      $('#sbfab').html('');
      return false;
    }
    if (stringra.length > 3) {
      DPR1_format_mod.alertFlash("Maximum three strings per search", 'yellow');
      $('#sbfb').html('<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>');
      $('#sbfa').html('');
      return false;
    }
    for (var s = 0; s < stringra.length; s++) {
      if (stringra[s].length < 3 && stringra.length > 0) {
        DPR1_format_mod.alertFlash("Minimum three letter search length", 'yellow');
        $('#sbfb').html('<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>');
        $('#sbfa').html('');
        $('#sbfab').html('');
        return false;
      }
    }
    return true;
  }

  function createBrowser(thisDocument, url, count) {
    var browser = thisDocument.createElement('browser');
    browser.setAttribute('disablehistory', 'true');
    browser.setAttribute('type', 'content');
    browser.setAttribute('src', url);
    browser.setAttribute('style', 'max-height:99%');
    browser.setAttribute('flex', '1');
    browser.setAttribute('persist', 'height');
    browser.setAttribute('id', 'dpr-index-top-' + count);

    return browser;
  }

  function createSplitter(thisDocument, count) {
    var splitter = thisDocument.createElement('splitter');
    splitter.setAttribute('id', 'dpr-index-top-' + count + '-splitter');

    return splitter;
  }

  return {
    eventSend,
    importXML,
    importXMLindex,
    openPlace,
    openIndex,
    sendQuickLinkOnEnterKey,
    sendQuickLink,
    sendAnalysisToOutput,
    sendDict,
    sendSearchOnEnterKey,
    sendSearch,
    checkGetstring,
    createBrowser,
    createSplitter,
  }
})()

window.DPRSend = DPR_Web_Send_Sidebar