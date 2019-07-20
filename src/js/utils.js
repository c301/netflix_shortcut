/**
*    Evaluate xpath string
*    @param aNode context node
*    @param aExpr Xpath expression
**/
function xpathEval( aNode, aExpr ) {
    // if only xpath string provided
    if ( arguments.length == 1 ) {
        aExpr = aNode;
        aNode = document;
    }

    var xpe = new XPathEvaluator(),
        nsResolver = xpe.createNSResolver( !aNode.ownerDocument ?
                                           aNode.documentElement :
                                           aNode.ownerDocument.documentElement ),
        result = xpe.evaluate( aExpr, aNode.documentElement ?
                               aNode.documentElement :
                               aNode, nsResolver, 0, null ),
        found = [],
        res;

    if ( result.resultType == 4 ) {
        while ( res = result.iterateNext() ) {
            found.push( res );
        }
        if ( found.length ) {
            return found;
        } else {
            return false;
        }
    }
    if ( result.resultType == 2 ) {
        return result.stringValue;
    }
}

function wait(x = 0){
    return new Promise(  resolve => {
        setTimeout(resolve, x);
    })
}
