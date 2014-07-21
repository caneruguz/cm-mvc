jsontree-generator
==================

Generate json in hierarchical format as a gulp plugin.

There will be a better generation step but for the moment go to index.js and change the obj object to something that fits your data structure:

```javascript
        var obj = function (){
            return { 	"name" : randomPerson(),
                "desc" : styledString("sentence", 14),
                "title" : styledString("title", 5),
                "age": randomNumber(60),
                "skills" : randomOption("js, css, html, python"),
                "status" : randomBoolean(),
                "stuff" : randomArray("mixed", randomNumber(8)),
                "children" : []
            }
        }
```

### Supported options

**randomPerson()** 
Creates a real person name based on an international list taken from Fake Name Generator. Choses from a list of about 500 names. 

**randomNumber()**
Generates random number, is used as helper for many other functions. 

