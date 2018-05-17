import yo from 'yo-yo';

// main export
export default function footer(options) {
  const t = options.t;

  return yo`<footer class="row text-light-gray no-padding-xs no-padding-sm">
  <div class="container row center-block" style="padding: 40px;">
    <div class="col-xs-12">
      <div class="row">
        <div class="col-xs-12 col-sm-3">
        
      </div>
      <br />

      <hr />

      <br />
      <div class="row">
        <div class="col-xs-6 col-md-9">
         
          <br />
          <small>© ${t("footer.copyright")}</small>
        </div>
        <div class="col-xs-6 col-md-3 text-right">
        </div>
    </div>
  </div>
</footer>`;
}
