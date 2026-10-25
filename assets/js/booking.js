(function () {
  'use strict';

  // All providers are fictional sample data. They are not real companies.
  var PROVIDERS = {
    trusted: [
      { id: 'zephyr', name: 'Zephyr Ridge Pest Co.', rating: 4.8, reviews: 1240, price: 189, eta: 'Next opening: tomorrow, 9 to 11 AM' },
      { id: 'mesquite', name: 'Mesquite Hollow Exterminators', rating: 4.7, reviews: 862, price: 199, eta: 'Next opening: Thursday, 1 to 3 PM' },
      { id: 'copperline', name: 'Copperline Pest Guard', rating: 4.6, reviews: 533, price: 175, eta: 'Next opening: Friday, 8 to 10 AM' }
    ],
    fast: [
      { id: 'dana', name: 'Dana R. Pest Pros', rating: 4.9, reviews: 38, price: 149, etaMin: 35 },
      { id: 'eli', name: "Eli's Quick Bug Works", rating: 4.7, reviews: 92, price: 139, etaMin: 55 },
      { id: 'sam', name: 'Sam Okafor Exterminating', rating: 4.8, reviews: 21, price: 145, etaMin: 80 }
    ]
  };

  var PEST_NAME = 'American cockroach';
  var DEFAULT_ZIP = '75201';

  var state = { tier: 'trusted', providerId: null, analysisToken: 0, previewUrl: null };

  function $(id) { return document.getElementById(id); }

  function findProvider(id) {
    var all = PROVIDERS.trusted.concat(PROVIDERS.fast);
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id) return all[i];
    }
    return null;
  }

  // Step navigation: shows one panel and updates the progress labels.
  function showStep(n) {
    for (var i = 1; i <= 3; i++) {
      $('panel-' + i).hidden = (i !== n);
      $('ind-' + i).classList.toggle('active', i === n);
      $('ind-' + i).classList.toggle('done', i < n);
    }
    $('panel-done').hidden = true;
    window.scrollTo(0, 0);
  }

  // Mock "AI pest identification": a short delay, then a preset result.
  function startAnalysis() {
    var token = ++state.analysisToken;
    $('result').hidden = true;
    $('analyzing').hidden = false;
    $('next-1').disabled = true;
    setTimeout(function () {
      if (token !== state.analysisToken) return;
      $('analyzing').hidden = true;
      $('result').hidden = false;
      $('next-1').disabled = false;
    }, 1800);
  }

  function clearPreview() {
    if (state.previewUrl) {
      URL.revokeObjectURL(state.previewUrl);
      state.previewUrl = null;
    }
    $('preview').hidden = true;
    $('preview').removeAttribute('src');
  }

  $('photo-input').addEventListener('change', function (e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    clearPreview();
    state.previewUrl = URL.createObjectURL(file);
    $('preview').src = state.previewUrl;
    $('preview').hidden = false;
    startAnalysis();
  });

  $('sample-btn').addEventListener('click', function () {
    clearPreview();
    startAnalysis();
  });

  $('next-1').addEventListener('click', function () { showStep(2); });

  // ZIP: keep digits only, max 5. Nothing is sent anywhere.
  $('zip').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 5);
    $('zip-error').hidden = true;
  });

  // Tier tabs: Trusted and Fast each show their own provider list.
  function setTier(tier) {
    state.tier = tier;
    state.providerId = null;
    $('next-2').disabled = true;
    var tabs = document.querySelectorAll('[role="tab"]');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].setAttribute('aria-selected', tabs[i].getAttribute('data-tier') === tier ? 'true' : 'false');
    }
    $('list-trusted').hidden = (tier !== 'trusted');
    $('list-fast').hidden = (tier !== 'fast');
    $('tier-note').textContent = tier === 'trusted'
      ? 'Established companies with more reviews. Prices are higher.'
      : 'Solo licensed exterminators nearby. Prices are lower, sorted by arrival time.';
    syncPressed();
  }

  document.querySelectorAll('[role="tab"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTier(btn.getAttribute('data-tier'));
    });
  });

  function renderList(tier) {
    var list = PROVIDERS[tier].slice();
    if (tier === 'fast') {
      list.sort(function (a, b) { return a.etaMin - b.etaMin; });
    }
    var html = list.map(function (p) {
      var eta = tier === 'fast' ? 'Arrives in about ' + p.etaMin + ' min' : p.eta;
      var kind = tier === 'fast' ? 'Solo operator' : 'Company';
      return '<button type="button" class="provider" data-id="' + p.id + '" aria-pressed="false">' +
        '<div class="provider-top">' +
          '<div><span class="provider-name">' + p.name + '</span><span class="provider-kind">' + kind + '</span></div>' +
          '<span class="badge">Licensed &#10003;</span>' +
        '</div>' +
        '<div class="provider-meta">' +
          '<span class="price">$' + p.price + ' <small>est.</small></span>' +
          '<span><strong>&#9733; ' + p.rating.toFixed(1) + '</strong> (' + p.reviews.toLocaleString('en-US') + ' reviews)</span>' +
          '<span>' + eta + '</span>' +
        '</div>' +
      '</button>';
    }).join('');
    $(tier === 'fast' ? 'list-fast' : 'list-trusted').innerHTML = html;
  }

  function syncPressed() {
    document.querySelectorAll('.provider').forEach(function (card) {
      card.setAttribute('aria-pressed', card.getAttribute('data-id') === state.providerId ? 'true' : 'false');
    });
  }

  document.addEventListener('click', function (e) {
    var card = e.target.closest ? e.target.closest('.provider') : null;
    if (!card) return;
    state.providerId = card.getAttribute('data-id');
    syncPressed();
    $('next-2').disabled = false;
  });

  $('next-2').addEventListener('click', function () {
    var zip = $('zip').value;
    if (!/^\d{5}$/.test(zip)) {
      $('zip-error').hidden = false;
      $('zip').focus();
      return;
    }
    var p = findProvider(state.providerId);
    if (!p) return;
    $('sum-pest').textContent = PEST_NAME;
    $('sum-zip').textContent = zip;
    $('sum-tier').textContent = state.tier === 'trusted' ? 'Trusted' : 'Fast';
    $('sum-provider').textContent = p.name;
    $('sum-price').textContent = '$' + p.price + ' (estimated)';
    showStep(3);
  });

  // Demo only: shows a confirmation and sends nothing.
  $('request-btn').addEventListener('click', function () {
    var p = findProvider(state.providerId);
    if (!p) return;
    for (var i = 1; i <= 3; i++) {
      $('panel-' + i).hidden = true;
      $('ind-' + i).classList.remove('active');
      $('ind-' + i).classList.add('done');
    }
    $('done-provider').textContent = 'You requested: ' + p.name + ' (sample only).';
    $('panel-done').hidden = false;
    $('panel-done').focus();
    window.scrollTo(0, 0);
  });

  document.querySelectorAll('[data-back]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showStep(parseInt(btn.getAttribute('data-back'), 10) - 1);
    });
  });

  $('restart-btn').addEventListener('click', function () {
    state.analysisToken++;
    state.providerId = null;
    clearPreview();
    $('photo-input').value = '';
    $('analyzing').hidden = true;
    $('result').hidden = true;
    $('next-1').disabled = true;
    $('zip').value = DEFAULT_ZIP;
    $('zip-error').hidden = true;
    setTier('trusted');
    showStep(1);
  });

  // Initial render.
  renderList('trusted');
  renderList('fast');
  setTier('trusted');
})();
