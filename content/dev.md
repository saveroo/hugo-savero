---
title: "Dev"
date: 2020-03-24T23:12:09+07:00
draft: false
---

{{< highlight html >}}
<section id="main">
  <div>
   <h1 id="title">{{ .Title }}</h1>
    {{ range .Pages }}
        {{ .Render "summary"}}
    {{ end }}
  </div>
</section>
{{< /highlight >}}

{{< gists >}}
