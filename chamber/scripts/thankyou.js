

(function () {
  const qs = new URLSearchParams(location.search);

 
  const put = (id, key, transform) => {
    const el = document.getElementById(id);
    if (!el) return;
    const raw = qs.get(key);
    el.textContent = raw ? (transform ? transform(raw) : raw) : "—";
  };

  
  const fmtDateTime = (iso) => {
   
    const d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleString();
  };

 
  put("outFirst", "firstName");
  put("outLast", "lastName");
  put("outEmail", "email");
  put("outMobile", "mobile");
  put("outOrg", "organization");
  put("outTs", "timestamp", fmtDateTime);
})();
