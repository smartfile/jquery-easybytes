.. image:: https://d2xtrvzo9unrru.cloudfront.net/brands/smartfile/logo.png
   :alt: SmartFile

A `SmartFile`_ Open Source project. `Read more`_ about how SmartFile
uses and contributes to Open Source software.

jquery-easybytes
================

If you store files sizes in your web application, it makes sense to use bytes server side. This widget makes this more user friendly on the client side.

Getting Started
------------

Including it on your page
------------

Include jQuery and the plugin on a page.
Then select a input to convert to easybytes and call the easybytes method.::


    <input type="text" name="filesize">
    <script src="jquery.js"></script>
    <script src="jquery.easybytes.js"></script>
    <script>
        $("input").easybytes();
    </script>

Options
------------

* `multiple`
    * Base multiplier to convert up to next unit.
    * numeric
    * 1000 or 1024
    * Default: 1024
* `abbr`
    * Indicates if we should abbriviate units.
    * boolean
    * true or false
    * Default: false
* `defaultUnit`
    * Indicates the unit that dropdown will use by default if no value present on input.
    * numeric
    * 0-4
    * Default: 3 (GB)
* `ids`
    * Indicates if html elements should have ids
    * boolean
    * true or false
    * Default: true
* `inputClass`
    * Allows you to add a class to the replacement input. We added this when changing to a bootstrap UI where bootstrap classes were needed on the input.
    * string or false
    * Default: false
* `selectClass`
    * Allows you to add a class to the unit select. We added this when changing to a bootstrap UI where bootstrap classes were needed on the input.
    * string or false
    * Default: false

Reporting an Issue
------------

Make sure the problem you're addressing is reproducible.
Use http://jsbin.com or http://jsfiddle.net to provide a test page.
Indicate what browsers the issue can be reproduced in. Note: IE Compatibilty modes issues will not be addressed.
What version of the plug-in is the issue reproducible in? Is it reproducible after updating to the latest version?
    
Then, report the issue via github

Contributing
------------

Please send a pull request via github.

License
------------
Copyright (c) 2013 SmartFile Licensed under the MIT license.

.. _SmartFile: http://www.smartfile.com/
.. _Read more: http://www.smartfile.com/open-source.html
