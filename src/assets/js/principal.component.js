(function($) {
  $(function() {
    $("#buscarTramitePage").autocomplete({
      data: {
        Apple: null,
        Microsoft: null,
        Google: "https://placehold.it/250x250"
      }
    });
  });
})(jQuery);
