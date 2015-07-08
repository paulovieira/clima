var leftMenuChannel = Backbone.Radio.channel('leftMenu');

var Dashboard = new Mn.Application();
Dashboard.$modal1 = $("#modal-1");
Dashboard.$modal2 = $("#modal-2");

Dashboard.addRegions({
	mainRegion: "#main-region",
	modal1Region: "#modal1-content-region",
	modal2Region: "#modal2-content-region"
});

var mainLayout = new MainLayout();

Dashboard.mainRegion.show(mainLayout);



Dashboard.utils = {};

Dashboard.utils.valueClasses = function(original, numClasses){

    var l = original.length;

    if(numClasses){
        if(!_.isNumber(numClasses)){
            throw new Error("invalid number of classes");            
        }

        if(numClasses < 1 || numClasses > l){
            throw new Error("invalid number of classes");
        }
    }


    var output = {};

    output[l + ""] = [];
    for(var y=0; y<original.length; y++){
        output[l + ""].push([original[y]]);
    }


    var chunkLength = 2;
    var numClass = l - 1;

    var method = "shift";

    while(chunkLength <= l){

        var n = Math.floor(l / chunkLength);
        for(var j=0; j<n; j++){

            var input = _.clone(original);
            var array1 = [];
            
            for(var k=0; k<=j; k++){
                var array2 = [];
                for(var r=0; r<chunkLength; r++){
                    array2.push(input[method]());
                }

                array2.sort(function(a, b){ return a-b;});
                array1.push(array2);
            }

            //console.log("input.length: ", input.length);
            flag = true;
            while(flag===true && input.length > 0){
                var temp = []
                for(var r=0; r<chunkLength-1; r++){
                    temp.push(input[method]());
                }
                
                if(_.contains(temp, undefined)){
                    flag = false;
                }
                temp.sort(function(a, b){ return a-b;});
                array1.push(temp);
            }

            // add to the obj if there aren't undefined values
            if(!_.contains(_.flatten(array1), undefined) ){
                array1.sort(function(a, b){ return a[0]-b[0];});
                output[numClass + ""] = array1;
                numClass--;
            } 
           
        }

        chunkLength++;
    }

    return numClasses ? output[numClasses + ""] : output;
};