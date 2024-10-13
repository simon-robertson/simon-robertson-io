In April 2024, [Shift](https://www.linkedin.com/posts/shiftonline_logistics-tech-firm-shift-buys-movinga-as-activity-7053638021014827008-Zgv5/) acquired Europe's leading moving (relocation) platform Movinga.

This was a fantastic opportunity for Shift but they had only really been focusing on domestic logistics within the UK until now, so support for multilingual applications and websites had never been a priority, and they had a very short window of time to resolve the problem.

I was asked to design and implement a solution for this.

## Large Language Models

LLMs such as OpenAI's GPT had been around for a while at this time, and I was familiar enough with the popular ones to know they could potentially be the answer to the multilingual problem. The OpenAI API (GPT) has previously been used for a project at Shift so I decide to test that one.

There were two applications and one website that had to support multiple languages; the main Shift website, the customer business dashboard, and the service provider application. The main website loaded most of its content from a CMS called Cockpit, while the business dashboard and the service provider application load their content and data from their own Shift API endpoints.

I took numerous text samples from the main website and the customer business dashboard and asked GPT to translate those samples into common European languages including French, Italian, Spanish, and German. The translations were then scored by fluent speakers of those languages, and GPT scored very highly even without additional context. Not all of the translations were perfect but they were definitely good enough, and they would avoid the lengthly and costly process of having everything translated manually.

With the use of the OpenAI API decided I now had to work out how to actually integrate it to enable translation support across multiple applications.

## The Shift API

The Shift API is powered by PHP and Laravel. The service provider application and the customer business dashboard both use the Shift API albeit having their own
endpoints, so it was obvious the solution for translation support would be within the API. All of the endpoints (routes) defined in Laravel can have their HTTP requests and responses flow through custom middleware, so I decided this had to be the solution; create a new middleware that could translate the content within HTTP responses before the response reached the client.

All text based content returned from Shift API endpoints is returned as a JSON encoded string, so I knew I could take advantage of this. The middleware that I created ended up looking something like this:

```php example.php
public function handle(Request $req, Closure $next)
{
    $lang = 'en';

    if ($req->has('lang')) {
        $lang = $req->get('lang');
    } elseif ($req->hasHeader('Accept-Language')) {
        $lang = $req->header('Accept-Language');
    }

    $lang = strtolower(substr($lang, 0, 2));

    /** @var Response $res */
    $res = $next($request);

    if ($res->headers->get('Content-Type') !== 'application/json') {
        return $res;
    }

    $content = json_decode($res->getContent(), true);
    $translated = $this->translatorService->translate($content, $lang);
    $res->setContent(json_encode($translated));
    $res->headers->set('Content-Language', $lang);

    return $res;
}
```

The middleware allows a specific language to be provided within the HTTP request content but if that is not provided the primary language accepted by the client is used. This allows application content to be translated without requiring any changes to be made to the applications. If a customer has their web browser language set to French for example, they would receive content translated to French.

I created a translation service separately from the middleware so it could be used as a general purpose tool within the Shift API, and the middleware uses that service. I will not go into detail about how the service works but it essentially uses the OpenAI API to translate text content if it needs to. Translated content is stored permanently in a database and temporarily in a Redis cache, making the increased duration of HTTP requests unnoticeable to untrained eyes.

## Complex Responses

Most of the Shift API endpoints return complex data structures, associative arrays from PHP, so I could not blindly translate those responses because everything including object property names would also end up being translated.

A typical endpoint response would look like this:

```php
return response()->json($content);
```

<p>I needed a way to allow specific values within the response content to be translated, and the solution to that ended up being a standardisation of the endpoint responses where translations were needed:</p>

```php
return response()->json([
    '__content' => $content,
    '__translate' => [
        'services.*.name',
        'services.*.description',
    ],
]);</code>
```

This data structure was something the translation service was able to look for before translating any of the content. It would also strip away this higher level data structure before returning the translated content so the client continued to receive only the $content that it was expecting.

A helper function was created for this to make the refactoring easier.

```php
return translateResponse($content, $translate);
```

This all worked very well after a bit of refactoring within the Shift API endpoints. The final piece of the puzzle was the main website which was still pulling content from the Cockpit CMS.

The solution for the main website was to direct all content requests through new Shift API endpoints that then reached out to Cockpit, essentially a proxy. That way the same translation middleware that was being used for the customer business dashboard and the service provider application could also be used for the main website.

## Problem Solved

Thanks to the advancement of large language models over the last few years, Shift now has a way to translate client facing content into multiple languages. GPT is able to translate English content into a huge number of languages, not just the common European languages, so this was a solution that should continue to work well into the future.

Overall a very interesting problem that had to be solved quickly.
