---
title: "Algorithm"
layout: archive
permalink: categories/algorithm
author_profile: true
sidebar_main: true
entries_layout: grid
classes: wide
---

{% assign posts = site.categories.Algorithm %} {% for post in posts %} {% include archive-single.html type=page.entries_layout
%} {% endfor %}
