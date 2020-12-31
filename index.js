addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const response = await fetch(request);
  const rewriter = new HTMLRewriter();
  rewriter.on('*', new ElementHandler());
  const transformed = rewriter.transform(response);

  return new Response(await transformed.text(), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

class ElementHandler {
  element(element) {
    if (element.tagName == 'title') {
      element.setInnerContent('Status | KweeksNews Network');
      element.after(
        '<link rel="apple-touch-icon" sizes="180x180" href="https://network.kweeksnews.com/apple-touch-icon.png">' +
          '<link rel="icon" type="image/png" sizes="32x32" href="https://network.kweeksnews.com/favicon-32x32.png">' +
          '<link rel="icon" type="image/png" sizes="16x16" href="https://network.kweeksnews.com/favicon-16x16.png">' +
          '<meta property="og:type" content="website">' +
          '<meta property="og:url" content="https://status.kweeksnews.com/">' +
          '<meta property="og:title" content="Status | KweeksNews Network">' +
          '<meta property="og:description" content="Informasi status terkini dan histori kinerja situs-situs KweeksNews Network.">' +
          '<meta property="og:site_name" content="KweeksNews Network">' +
          '<meta property="og:ttl" content="345600">' +
          '<meta name="twitter:creator" content="@kweeksnews">' +
          '<meta name="twitter:site" content="@kweeksnews">',
        { html: true },
      );
      return element;
    }

    if (
      element.tagName == 'meta' &&
      element.getAttribute('name') == 'Description'
    ) {
      element.setAttribute(
        'content',
        'Informasi status terkini dan histori kinerja situs-situs KweeksNews Network.',
      );
      return element;
    }

    if (
      element.tagName == 'link' &&
      element.getAttribute('rel') == 'shortcut icon'
    ) {
      element.remove();
      return element;
    }

    if (element.tagName == 'head') {
      element.append(
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap">' +
          '<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" ' +
          'integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" ' +
          'crossorigin="anonymous" as="script">' +
          '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" ' +
          'integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" ' +
          'crossorigin="anonymous"></script>',
        { html: true },
      );
      return element;
    }

    if (element.tagName == 'body') {
      element.append(script, { html: true });
      return element;
    }
  }
}

const script = `
<script>
  let limit = 2000;
  let counter = setInterval(edit, 10);
  function edit() {
    limit -= 10;
    if (limit == 0) {
      clearInterval(counter);
    }
    $('title').attr('class', '');
    $(document).prop('title', 'Status | KweeksNews Network');
    $('meta[name="Description"]').attr(
      'content',
      'Informasi status terkini dan histori kinerja situs-situs KweeksNews Network.',
    );
    $('link[rel="shortcut icon"]').remove();
    $('.statuspage-titlebar-company-logo').attr({
      alt: 'KweeksNet',
      title: 'KweeksNet',
    });
    $('p.badge').html(
      '© ' +
        new Date().getFullYear() +
        ' <a class="marking" href="https://network.kweeksnews.com/" target="_blank">KweeksNews Network</a>. All Rights Reserved.',
    );
  }
</script>
<style>
  html, body {
    background-color: #ffffff;
  }

  body * {
    font-family: 'Quicksand', 'Roboto', 'Ubuntu', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif !important;
  }

  .statuspage-titlebar-company-logo {
    max-height: 50px !important;
  }

  .statusbar {
    border-radius: 10px !important;
    box-shadow: none !important;
  }

  .statuspage-statusbar-status {
    border-radius: 10px !important;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1);
  }

  .checklist-wrapper {
    border-radius: 10px !important;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08) !important;
  }

  .datetime {
    text-align: right;
  }

  .statuspage-checks-name {
    padding-right: 10px;
    font-weight: 600 !important;
  }

  .statuspage-checks-downtime-data {
    text-align: right;
  }

  .badge {
    color: #000000 !important;
    cursor: auto !important;
    font-family: 'Quicksand', 'Roboto', 'Ubuntu', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif !important;
  }

  .marking {
    color: #dd9933;
  }

  @media screen and (min-width: 601px) {
    ::-webkit-scrollbar {
      -webkit-appearance: none;
    }
  
    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }
  
    ::-webkit-scrollbar-track {
      background: #ffffff;
    }
  
    ::-webkit-scrollbar-thumb {
      background: #454545;
      height: 100px;
      border-radius: 10px;
    }
  
    ::-webkit-scrollbar-thumb:hover {
      background: #000000;
    }
  
    .main-container {
      padding: 0 1em;
    }
  }
</style>
`;
