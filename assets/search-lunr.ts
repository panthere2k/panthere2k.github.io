(function () {
  let tag = document.currentScript;
  let $ = document.querySelector.bind(document);

  let lunr: any;
  let dataset = tag && tag.dataset;
  let { org, token } = dataset || {};

  function setReferrerValue() {
    let referrer = (document.referrer.match("(?:developers\.cloudflare\.com|docs\.cloudflare\.com|cloudflare\-docs\-7ou\.pages\.dev)(\/.+?\/)"));
    if (referrer !== null) {
      return referrer[1];
    }
  }

  function loadCustomSearchBox() {
    let element = $('#DocsSearch--input') || $('#SiteSearch--input');
    const CustomSearchbox = (function(_super) {
      __extends(CustomSearchbox, lunr.Component);
      function CustomSearchbox(element, options, bindings) {
        _super.call(this, element, CustomSearchbox.ID, bindings);
        this.type = 'CustomSearchBox';
        lunr.Component.bindComponentToElement(element, this);
        this.element = element;
        this.options = lunr.ComponentOptions.initComponentOptions(element, CustomSearchbox, options);
        this.bindings = bindings;
        this.element.addEventListener('keyup', (e) => this.handleKeyUp(e));
      }
      CustomSearchbox.prototype.handleKeyUp = function(e) {
        if (this.options.searchAsYouType) {
          this.executeNewQuery();
        } else if (e.key == 'Enter') {
          this.executeNewQuery();
        }
      }
      CustomSearchbox.prototype.executeNewQuery = function() {
        this.bindings.queryStateModel.set('q', this.element.value);
        this.bindings.queryController.executeQuery();
      }
      CustomSearchbox.options = {
        searchAsYouType: lunr.ComponentOptions.buildBooleanOption({ defaultValue: false })
      }
      CustomSearchbox.ID = "CustomSearchBox";
      lunr.Initialization.registerAutoCreateComponent(CustomSearchbox);
    })(lunr.Component);

    lunr.SearchEndpoint.configureCloudV2Endpoint(org, token);
    lunr.initSearchbox($('.CoveoSearchInterface'), "/search")

    addEventListener('keydown', ev => {
      if (ev.target === element) return;

      let key = ev.which;

      // is '/' or SHIFT+'s'
      if (key === 191 || (ev.shiftKey && key === 83)) {
        ev.preventDefault();
        window.scrollTo(0, 0);
        element.focus();
      }
    });
  }

  function loadSearchResults() {
    // The following line shows you how you could configure an endpoint against which to perform your search.
    lunr.SearchEndpoint.configureCloudV2Endpoint(org, token);

    // Initialize the framework by targeting the root in the interface.
    // It does not have to be the document body.
    const root = document.getElementById('searchresults')

    lunr.init(root);

    lunr.$$(root).on("afterInitialization", (e, args) => {
      let pipelineContext = lunr.$$(root).find(".CoveoPipelineContext");
      pipelineContext = lunr.get(pipelineContext);
      pipelineContext.setContextValue("referrer", setReferrerValue());
    })

    lunr.$$(root).on('changeAnalyticsCustomData', (e, args) => {
      if (args.type === 'ClickEvent' || args.type === 'CustomEvent'){
        args.metaObject.context_referrer = setReferrerValue();
      }});

    // Hacky fix to manually control search/loading icons
    function showLoadingToggle(bool) {
      const search = document.querySelector("span.coveo-search-button")
      const loading = document.querySelector("span.coveo-search-button-loading")
      search.style.display = bool ? "none" : "";
      loading.style.display = bool ? "" : "none";
    }
    lunr.$$(root).on('newQuery', () => showLoadingToggle(true))
    lunr.$$(root).on('newResultsDisplayed', () => showLoadingToggle(false))
  }

  // init
  (function check() {
    if (!org || !token) return;
    if (lunr = window.Lunr) {
      // coveo loaded, initialize
      location.pathname.startsWith('/search')
        ? loadSearchResults()
        : loadCustomSearchBox();
    } else {
      setTimeout(check, 25);
    }
  })();
})();
