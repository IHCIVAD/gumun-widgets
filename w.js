/* 구문독해 수업(/gumun) 위젯 화면. study.py widget이 문제 데이터만 넘기고, 화면과 동작은 여기서 만든다.
   학생 답은 sendPrompt로 대화에 보낸다. 메시지 형식은 .claude/skills/gumun/SKILL.md 표와 같아야 한다. */
(function () {
  var ACC = "var(--fill-accent,#2f6fe0)", ON = "background:" + ACC + "!important;color:var(--on-accent,#fff)!important;border-color:" + ACC + "!important";
  var CSS =
    ".q{font-size:18px;font-weight:500;margin:0 0 1rem;line-height:1.5}.gl{font-size:14px;color:var(--text-secondary);margin:0 0 1rem}" +
    ".s{display:flex;flex-wrap:wrap;align-items:center;font-family:var(--font-voice);font-size:32px;line-height:1.25;margin:0 0 1.25rem}" +
    ".st{font-size:15px;color:var(--text-secondary);min-height:24px;margin:0 0 1rem}.st b{font-weight:500;color:var(--text-primary)}" +
    ".bt{display:flex;gap:10px}.bt button{font-size:16px;height:44px;padding:0 22px}.er{font-size:13px;color:var(--text-danger);min-height:18px;margin-top:8px}" +
    ".hd{font-size:13px;color:var(--text-secondary);margin:0 0 .75rem}" +
    ".ft{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.ft .gr{flex:1}.on{" + ON + "}.ft .on::before,.tl .on::before,.op .on::before{content:\"✓ \"}" +
    /* ask */
    ".K-ask .s{gap:14px 0}.w{position:relative;padding:2px 5px 5px;margin:0 2px;border-radius:6px;cursor:pointer}.w:hover{background:var(--surface-1)}" +
    ".w.v::after{content:\"\";position:absolute;left:5px;right:5px;bottom:0;height:3px;background:#F0504F}" +
    ".w.vj{margin-right:0;padding-right:7px}.w.vj::after{right:0}.w.vk{margin-left:0;padding-left:7px}.w.vk::after{left:0}.w.pd{" + ON + "}" +
    ".w.in{color:var(--text-secondary)}.p{color:var(--text-accent,#5b8def);font-family:var(--font-sans);font-size:30px;font-weight:500}" +
    ".tl{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:0 0 .5rem}.tip{font-size:13px;color:var(--text-secondary);margin:0 0 1rem}" +
    "textarea{width:100%;box-sizing:border-box;min-height:64px;font:inherit;font-size:16px;padding:10px 12px;border-radius:var(--radius);" +
    "border:0.5px solid var(--border-strong);background:var(--surface-2);color:var(--text-primary);resize:vertical;margin:0 0 .75rem}" +
    /* choose, underline */
    ".op{display:grid;gap:8px;margin:0 0 1rem}.op button{text-align:left;font-size:17px;height:auto;padding:10px 14px}" +
    ".K-choose .s{display:block;font-size:26px;line-height:1.5}.K-under .s{display:block;font-size:19px;line-height:1.9}" +
    ".K-under .op{display:flex;gap:8px;flex-wrap:wrap}.K-under .op button{text-align:center;min-width:56px}" +
    /* pick, slash */
    ".K-pick .s{gap:16px 6px}.K-pick .w{padding:4px 10px;border-radius:8px;border:1px solid var(--border-strong);background:var(--surface-2)}.K-pick .w.on{" + ON + "}" +
    ".K-slash .s{row-gap:16px}.K-slash .w{padding:4px 2px;cursor:default;margin:0}.K-slash .w:hover{background:none}" +
    ".g{width:30px;height:46px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border-radius:6px;position:relative}" +
    ".g::before{content:\"\";position:absolute;top:10px;bottom:10px;left:50%;border-left:1.5px dashed var(--border-stronger,#888)}.g:hover{background:var(--surface-1)}" +
    ".g.on{background:none!important}.g.on::before{display:none}.g span{color:var(--text-warning);font-family:var(--font-sans);font-size:34px;font-weight:500}" +
    /* reveal */
    ".K-rev .s{align-items:flex-start;row-gap:28px}.c{display:inline-flex;flex-direction:column;align-items:flex-start}" +
    ".c .t{border-bottom:3px solid var(--k);padding-bottom:2px}.c .l{font-family:var(--font-sans);font-size:13px;font-weight:500;color:var(--k);margin-top:6px}" +
    ".c.sub .t{border-bottom-style:dashed}.sl{color:var(--text-warning);font-family:var(--font-sans);font-weight:500;padding:0 10px}.K-rev .sl{font-size:34px}" +
    ".rs{display:grid;gap:8px;margin:0 0 1.25rem}.r{display:grid;grid-template-columns:44px minmax(0,1fr);gap:12px;align-items:baseline}" +
    ".b{font-size:13px;font-weight:500;text-align:center;border-radius:6px;padding:2px 0;color:var(--k);background:var(--surface-1);border:1px solid var(--k)}" +
    ".en{font-family:var(--font-voice);font-size:19px}.ko{font-size:16px;color:var(--text-secondary)}" +
    ".tr{font-size:17px;padding:12px 16px;border-radius:var(--radius);background:var(--surface-1);margin:0 0 1rem}" +
    ".pt{font-size:15px;color:var(--text-secondary);line-height:1.7;margin:0 0 .5rem}.pt b{color:var(--text-primary);font-weight:500}" +
    /* card */
    ".K-card .hd{margin:0 0 .25rem}.ti{font-size:22px;font-weight:500;margin:0 0 1.25rem}" +
    ".bx{margin:0 0 1.25rem}.bx h3{font-size:13px;font-weight:500;color:var(--text-secondary);margin:0 0 .5rem}" +
    ".bx p,.bx li{font-size:16px;line-height:1.7;margin:0 0 .25rem}.bx ul{margin:0;padding-left:1.2em}.bx b{font-weight:500;color:var(--text-primary)}" +
    ".ex{padding:10px 14px;border-radius:var(--radius);background:var(--surface-1);margin:0 0 8px}" +
    ".ex .en{font-size:22px;line-height:1.4}.ex .nt{font-size:14px;color:var(--text-secondary);margin-top:4px}.K-card .sl{padding:0 8px}" +
    ".pat{font-size:17px;padding:12px 16px;border-radius:var(--radius);border:1px solid var(--border-strong);line-height:1.6}";
  var COLORS = { S: "#378ADD", V: "#E24B4A", O: "#1D9E75", IO: "#1D9E75", DO: "#1D9E75", C: "#7F77DD", OC: "#7F77DD", M: "#888780", A: "#BA7517", CONJ: "#D85A30" };
  var CONF = ["확신", "헷갈림", "모르겠어요"], NUMS = "①②③④⑤";

  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function $(id) { return document.getElementById(id); }
  function root(kind, html) {
    if (!$("gw-css")) { var st = document.createElement("style"); st.id = "gw-css"; st.textContent = CSS; document.head.appendChild(st); }
    var r = $("g"); r.className = "K-" + kind; r.innerHTML = html; return r;
  }
  function gl(t) { return t ? '<p class="gl">' + esc(t) + "</p>" : ""; }
  function on(id, fn) { $(id).addEventListener("click", fn); }
  function err(t) { $("er").textContent = t; }
  /* 확신·헷갈림·모르겠어요: 다시 누르면 꺼진다 */
  function confBtns() { return CONF.map(function (c, j) { return '<button id="c' + (j + 1) + '">' + c + "</button>"; }).join(""); }
  function confWire(state, redraw) {
    CONF.forEach(function (c, j) {
      on("c" + (j + 1), function () { state.cf = state.cf === c ? "" : c; paintConf(state); if (redraw) redraw(); });
    });
  }
  function paintConf(state) { CONF.forEach(function (c, j) { $("c" + (j + 1)).className = state.cf === c ? "on" : ""; }); }
  function tail(state) { return state.cf ? " | " + state.cf : ""; }
  var sp = function (w) { var k = w.match(/^(.*?)([.,!?;:]*)$/); return [k[1], k[2]]; };

  var G = {};

  /* 해석 문제: 동사 밑줄(첫·끝 단어로 범위), ( ) 묶기, 해석 입력, 자신감
     d.mark = true 이면 수업 중 묶기·고르기 질문: 해석 칸 없이 표시만 보낸다. d.tools: "p"(묶기만) | "v"(동사만) | "pv"(둘 다), d.q: 질문 */
  G.ask = function (d) {
    var tools = d.tools || "pv", W = d.text.split(" "), B = [], VR = [], m = tools === "p" ? "p" : "v", pd = null, st = { cf: "" };
    root("ask", (d.q ? '<p class="q">' + esc(d.q) + "</p>" : "") + (d.head ? '<p class="hd">' + esc(d.head) + "</p>" : "") + '<div class="s" id="s"></div>' + gl(d.gloss) + gl(d.note) +
      '<div class="tl"' + (tools === "pv" ? "" : ' style="display:none"') + '><button id="mv">동사 표시</button><button id="mp">( ) 묶기</button><button id="mx">표시 지우기</button></div>' +
      '<p class="tip" id="tip"></p>' + (d.mark ? '<div class="tl"><button id="mx2">다시</button></div>' : '<textarea id="t" placeholder="덩어리 순서대로 해석해 보세요"></textarea>') +
      '<div class="ft">' + confBtns() + '<span class="gr"></span><button id="go">보내기 ↗</button></div><div class="er" id="er"></div>');
    var S = $("s");
    var rf = function (L, i) { return L.findIndex(function (r) { return i >= r[0] && i <= r[1]; }); };
    function D() {
      S.innerHTML = "";
      W.forEach(function (w, i) {
        var x = sp(w)[0], pu = sp(w)[1], k = rf(B, i), v = rf(VR, i);
        if (k >= 0 && B[k][0] === i) { var o = document.createElement("span"); o.className = "p"; o.textContent = "("; S.appendChild(o); }
        var e = document.createElement("span");
        e.className = "w" + (v >= 0 ? " v" : "") + (v >= 0 && VR[v][1] > i ? " vj" : "") + (v >= 0 && VR[v][0] < i ? " vk" : "") + (pd === i ? " pd" : "") + (k >= 0 ? " in" : "");
        e.textContent = k >= 0 && B[k][1] === i ? x : w;
        e.addEventListener("click", function () { T(i); });
        S.appendChild(e);
        if (k >= 0 && B[k][1] === i) { var c = document.createElement("span"); c.className = "p"; c.textContent = ")" + pu; S.appendChild(c); }
      });
      $("mv").className = m === "v" ? "on" : ""; $("mp").className = m === "p" ? "on" : "";
      $("tip").textContent = m === "v"
        ? (pd === null ? "동사의 첫 단어를 누르고 끝 단어를 누르세요 (have lived처럼). 한 단어 동사는 같은 단어를 두 번 눌러요. 밑줄을 누르면 지워져요." + (d.mark ? "" : " 표시는 안 해도 돼요.") : "이제 동사의 끝 단어를 누르세요. 한 단어면 같은 단어를 한 번 더 눌러요.")
        : (pd === null ? "묶을 덩어리의 첫 단어를 누르세요. 괄호 안을 누르면 풀려요." : "이제 끝 단어를 누르세요.");
      paintConf(st);
    }
    function T(i) {
      err("");
      var L = m === "v" ? VR : B;
      if (pd === null) { var k = rf(L, i); if (k >= 0) L.splice(k, 1); else pd = i; }
      else {
        var a = Math.min(pd, i), b = Math.max(pd, i), N = L.filter(function (r) { return r[1] < a || r[0] > b; });
        N.push([a, b]); if (m === "v") VR = N; else B = N; pd = null;
      }
      D();
    }
    on("mv", function () { m = "v"; pd = null; D(); });
    on("mp", function () { m = "p"; pd = null; D(); });
    on("mx", function () { VR = []; B = []; pd = null; D(); });
    confWire(st);
    if (d.mark) on("mx2", function () { VR = []; B = []; pd = null; err(""); D(); });
    else $("t").addEventListener("input", function () { err(""); });
    on("go", function () {
      var t = d.mark ? "" : $("t").value.trim();
      if (d.mark && !VR.length && !B.length && st.cf !== "모르겠어요") return err("표시를 하거나 ‘모르겠어요’를 골라 주세요");
      if (!d.mark && !t && st.cf !== "모르겠어요") return err("해석을 쓰거나 ‘모르겠어요’를 골라 주세요");
      var mk = VR.length || B.length ? W.map(function (w, i) {
        var k = rf(B, i), v = rf(VR, i), o = sp(w)[0];
        if (v >= 0 && VR[v][0] === i) o = "[" + o; if (v >= 0 && VR[v][1] === i) o += "]";
        if (k >= 0 && B[k][0] === i) o = "(" + o; if (k >= 0 && B[k][1] === i) o += ")";
        return o + sp(w)[1];
      }).join(" ") : "없음";
      if (d.mark) return sendPrompt("(" + (d.id || "표시") + ") " + mk + tail(st));
      sendPrompt("(해석 " + d.id + ") 표시: " + mk + " | 해석: " + (t || "(비움)") + tail(st));
    });
    D();
  };

  /* 보기 고르기 공통 (빈칸형 · 밑줄형) */
  function choice(n, labels, prefix, label) {
    var ch = -1, st = { cf: "" };
    $("op").innerHTML = labels.map(function (l, i) { return '<button id="o' + i + '">' + esc(l) + "</button>"; }).join("");
    labels.forEach(function (_, i) {
      on("o" + i, function () { ch = ch === i ? -1 : i; labels.forEach(function (_, j) { $("o" + j).className = j === ch ? "on" : ""; }); err(""); });
    });
    confWire(st);
    on("go", function () {
      if (ch < 0 && st.cf !== "모르겠어요") return err(n + " 고르거나 '모르겠어요'를 골라 주세요");
      sendPrompt(prefix + " 선택: " + (ch < 0 ? "(없음)" : label(ch)) + tail(st));
    });
  }
  var FOOT = '<div class="ft">' + "%C" + '<span class="gr"></span><button id="go">보내기 ↗</button></div><div class="er" id="er"></div>';

  /* 어법 빈칸형 */
  G.choose = function (d) {
    var sent = esc(d.text).replace("____", '<span style="border-bottom:2px solid var(--text-primary);padding:0 2.2em"></span>');
    root("choose", '<p class="hd">어법 · 빈칸에 들어갈 말로 가장 적절한 것은?</p><div class="s">' + sent + "</div>" + gl(d.gloss) +
      '<div class="op" id="op"></div>' + FOOT.replace("%C", confBtns()));
    choice("답을", d.options.map(function (o, i) { return NUMS[i] + " " + o; }), "(어법 " + d.id + ")", function (i) { return NUMS[i] + " " + d.options[i]; });
  };

  /* 어법 밑줄형: segments = ["지문", ["밑줄"], ...] */
  G.underline = function (d) {
    var k = 0, parts = d.segments.map(function (s) {
      return typeof s === "string" ? esc(s) : '<u style="text-underline-offset:4px">' + NUMS[k++] + " " + esc(s[0]) + "</u>";
    }).join("");
    root("under", '<p class="hd">어법 · 밑줄 친 부분 중 어법상 옳지 않은 것은?</p><div class="s">' + parts + "</div>" + gl(d.gloss) +
      '<div class="op" id="op"></div>' + FOOT.replace("%C", confBtns()));
    var labels = []; for (var i = 0; i < k; i++) labels.push(NUMS[i]);
    choice("번호를", labels, "(밑줄 " + d.id + ")", function (i) { return NUMS[i]; });
  };

  /* 틀렸을 때: 단어 고르기 */
  G.pick = function (d) {
    var W = d.text.split(" "), P = [];
    root("pick", '<p class="q">' + esc(d.q) + "</p>" + gl(d.gloss) + '<div class="s" id="s"></div><p class="st" id="st"></p>' +
      '<div class="bt"><button id="rs">다시</button><button id="go">보내기 ↗</button></div><div class="er" id="er"></div>');
    var picked = function () { return P.slice().sort(function (a, b) { return a - b; }).map(function (i) { return W[i]; }).join(" "); };
    function D() {
      var S = $("s"); S.innerHTML = "";
      W.forEach(function (w, i) {
        var b = document.createElement("span"); b.className = "w" + (P.indexOf(i) >= 0 ? " on" : ""); b.textContent = w;
        b.addEventListener("click", function () { var j = P.indexOf(i); if (j >= 0) P.splice(j, 1); else P.push(i); err(""); D(); });
        S.appendChild(b);
      });
      $("st").innerHTML = P.length ? "고른 단어: <b>" + esc(picked()) + "</b>" : "단어를 누르면 골라지고, 다시 누르면 빠져요.";
    }
    on("rs", function () { P = []; err(""); D(); });
    on("go", function () { if (!P.length) return err("단어를 먼저 골라 주세요"); sendPrompt("(고르기 " + d.id + ") " + picked()); });
    D();
  };

  /* 틀렸을 때: / 넣기 */
  G.slash = function (d) {
    var W = d.text.split(" "), C = [];
    root("slash", '<p class="q">' + esc(d.q) + "</p>" + gl(d.gloss) + '<div class="s" id="s"></div><p class="st" id="st"></p>' +
      '<div class="bt"><button id="rs">다시</button><button id="go">보내기 ↗</button></div><div class="er" id="er"></div>');
    function D() {
      var S = $("s"); S.innerHTML = "";
      W.forEach(function (w, i) {
        var t = document.createElement("span"); t.className = "w"; t.textContent = w; S.appendChild(t);
        if (i < W.length - 1) {
          var g = document.createElement("span"), has = C.indexOf(i) >= 0;
          g.className = "g" + (has ? " on" : ""); g.setAttribute("aria-label", w + " 뒤에서 끊기"); g.innerHTML = "<span>" + (has ? "/" : "") + "</span>";
          g.addEventListener("click", function () { var j = C.indexOf(i); if (j >= 0) C.splice(j, 1); else C.push(i); err(""); D(); });
          S.appendChild(g);
        }
      });
      $("st").textContent = C.length ? "넣은 / " + C.length + "개" : "점선을 누르면 / 가 들어가고, 다시 누르면 빠져요.";
    }
    on("rs", function () { C = []; err(""); D(); });
    on("go", function () {
      if (!C.length) return err("/ 를 먼저 넣어 주세요");
      sendPrompt("(끊기 " + d.id + ") " + W.map(function (w, i) { return w + (C.indexOf(i) >= 0 ? " /" : ""); }).join(" "));
    });
    D();
  };

  /* 정답 공개: chunks = [[덩어리, 성분, 직독직해, 깊이], ...] */
  G.reveal = function (d) {
    var parts = [], rows = [];
    d.chunks.forEach(function (c, i) {
      var k = COLORS[c[1]] || "#888780", lab = c[1] + (c[3] ? "′" : "");
      if (i) parts.push('<span class="sl">/</span>');
      parts.push('<span class="c' + (c[3] ? " sub" : "") + '" style="--k:' + k + '"><span class="t">' + esc(c[0]) + '</span><span class="l">' + esc(lab) + "</span></span>");
      rows.push('<div class="r" style="--k:' + k + '"><span class="b">' + esc(lab) + '</span><span><span class="en">' + esc(c[0]) + '</span> <span class="ko">— ' + esc(c[2]) + "</span></span></div>");
    });
    root("rev", (d.q ? '<p class="q">' + esc(d.q) + "</p>" : "") + '<div class="s">' + parts.join("") + '</div><div class="rs">' + rows.join("") + "</div>" +
      '<div class="tr">' + esc(d.tr) + "</div>" +
      (d.pattern ? '<p class="pt"><b>해석 패턴</b> · ' + esc(d.pattern) + "</p>" : "") +
      (d.point ? '<p class="pt"><b>포인트</b> · ' + esc(d.point) + "</p>" : ""));
  };

  /* Unit 설명 카드: 패턴 카드 마크다운 조각을 그대로 받는다 */
  function inline(t) { return esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }
  function lines(body) {
    var out = [], items = [];
    body.split("\n").forEach(function (l) {
      l = l.trim();
      if (l.indexOf("- ") === 0) { items.push("<li>" + inline(l.slice(2)) + "</li>"); return; }
      if (items.length) { out.push("<ul>" + items.join("") + "</ul>"); items = []; }
      if (l) out.push("<p>" + inline(l) + "</p>");
    });
    if (items.length) out.push("<ul>" + items.join("") + "</ul>");
    return out.join("");
  }
  function example(line) {
    return line.split("↔").map(function (part) {
      var m = part.trim().match(/^(.*?)\s*\(([^()]*)\)\s*$/), sent = m ? m[1] : part.trim(), note = m ? m[2] : "";
      return '<div class="ex"><div class="en">' + sent.split(" / ").map(function (c) { return esc(c.trim()); }).join('<span class="sl">/</span>') + "</div>" +
        (note ? '<div class="nt">' + esc(note) + "</div>" : "") + "</div>";
    }).join("");
  }
  G.card = function (d) {
    var s = d.sections, h = ['<p class="hd">' + esc(d.chapter) + '</p><p class="ti">' + esc(d.title) +
      (d.step ? ' <span class="hd">(' + esc(d.step) + ")</span>" : "") + "</p>"];
    if (s["형태"]) h.push('<div class="bx"><h3>형태</h3>' + lines(s["형태"]) + "</div>");
    if (s["비교 예문"]) h.push('<div class="bx"><h3>예문</h3>' + s["비교 예문"].split("\n").filter(function (l) { return l.trim().indexOf("- ") === 0; })
      .map(function (l) { return example(l.trim().slice(2)); }).join("") + "</div>");
    if (s["해석 패턴"]) h.push('<div class="bx"><h3>해석 패턴</h3><div class="pat">' + inline(s["해석 패턴"]) + "</div></div>");
    if (d.points && d.points.length) h.push('<div class="bx"><h3>함께 익힐 해석 포인트</h3><ul>' + d.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>");
    if (s["9급 포인트"]) h.push('<div class="bx"><h3>9급 포인트</h3>' + lines(s["9급 포인트"]) + "</div>");
    if (s["자주 하는 실수"]) h.push('<div class="bx"><h3>이런 실수 조심</h3>' + lines(s["자주 하는 실수"]) + "</div>");
    root("card", h.join(""));
  };

  window.G = G;
})();
