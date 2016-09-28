$(document).ready(function(){

var cats;

var model = {
// Adding a new cat is simple just add a cat(name, src, counter) to the array :-)
    init: function(){ 
        //initialize cats array
        if(! cats){
            cats = [new cat("cat_1", "images/cat1.jpg", 0), new cat("cat_2", "images/cat2.jpg", 0),
            new cat("cat_3", "images/cat3.jpg", 0), new cat("cat_4", "images/cat4.jpg", 0),
            new cat("cat_5", "images/cat5.jpg", 0), new cat("cat_6", "images/cat6.jpg", 0)];
        }
    },
    // get a specific cat from the cats array
    get_cat: function(index){
        return cats[index];
    },
    // returns the complete cats array
    get_cats: function(){
        return cats;
    },
    // Adds a cat object to the array
    add_cat: function(cat){
        cats.push(cat);
    }

};

// creates a cat object model
var cat = function(name, src, counter){
    this.name = name;
    this.src = src;
    this.counter = counter;
}
// * for MV* model
var octopus = {
    init: function(){
        model.init();
        // console.log(cats);
    },

    render: function(){
        //generates a cat list in dom
        model.get_cats().forEach(view_catlist.view_cat);
        // renders the first cat on page load
        view_catMain.render(model.get_cat(0));
    },
    //changes cat main image on clicking CAT list item
    update: function(){
        $("li").on("click", function(){
            var id = this.id;
            var index = parseInt(id.match(/\d+/)) - 1;
            // console.log(index);
            view_catMain.render(model.get_cat(index)); 
            // reattaches click listener on image change
            octopus.click_counter();
                       
        });
    },
    // updates the number of clicks in model as well as DOM
    click_counter: function(){
        $("img").on("click", function(){
            var id = this.id;
            var index = parseInt(id.match(/\d+/)) - 1;
            // console.log(index);
            var counter_id = model.get_cat(index).name + "_counter";
            // console.log(counter_id);
            cats[index].counter ++;
            view_catMain.update_counter(counter_id, model.get_cat(index).counter);
            // console.log(cats[index].counter);
        })
    }

};

// View for generating unordered cat list
var view_catlist = {
    view_cat: function(cat){
        var catlist_container = $("#cat_list");
        catlist_container.append("<li id='"+cat.name+"_li'>"+cat.name+"</li>");
    }
};

// View for rendering cat main image and its counter
var view_catMain = {
    // loads main image and its counter to the DOM
    render: function(cat){
        var container = $("#cat_container");
        container.html("<h2><span>Counter </span><span id='"+cat.name+"_counter'>"+ cat.counter+ "<span></h2><img id='"+cat.name+"_img' src = '"+cat.src+"'>");
    },

    // updates the counter in the dom
    update_counter: function(id, counter){
        var counter_span = $("#"+id);
        // console.log(counter_span);
        counter_span.html(counter);
    }
};


octopus.init();
octopus.render();
octopus.update();
octopus.click_counter();
});