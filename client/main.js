import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Image } from '../imports/api/tasks.js';
import './main.html';
var img=[
{
img_src:"home.jpg",
img_alt:"It happens with me most of the time"

},
{
img_src:"home1.jpeg",
img_alt:"It happens with me most of the time"

},
{
img_src:"home2.jpeg",
img_alt:"It happens with me most of the time"

}
];

//Template.images.helpers({image:img})

 Template.images.helpers({image: Image.find({},{sort:{createdOn:-1,rating:-1}}) });
 console.log(Image.find().count());
 Template.user.helpers({username:function(){
	if(Meteor.user())
	return Meteor.user().username;
	else
	return "Anonymous"
}});
Template.images.events({
'click .js-mouse':function(event){
	$(event.target).css('width','200px');
		},
'click .js-del-btn':function(event){
var image_id=this._id;
$("#"+image_id).hide("slow",function(){
	Images.remove({'_id':image_id}); })
},
'click .js-rating':function(event){
	var rating=$(event.currentTarget).data("userrating");
	//console.log(rating);
	image_id=this.id;
	//console.log(image_id);
	Images.update({_id:image_id},{ $set :{rating:rating}});

},
'click .js-hide': function(event){
	//alert("Hello");
	a=!a;	
	if(a==0)        
	{	$("#show").hide();
		 $("#12").text("Show Form");
	}
	else
	{ $("#show").show();
	 
	$("#12").text("Hide Form"); 

	}

}
});
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});


Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

var a=0;
Template.addimages.events({

'submit .js-addimage'(event,instance){
	//alert("working");
	Src=event.target.img_src.value;
	Alt=event.target.img_alt.value;
	//alert(Src);
	//alert(Alt);
	Images.insert({
	img_src:Src,
	img_alt:Alt}
	)	
	//console.log(instance);
	return false;		}

});



if(Meteor.isServer)
{
console.log("I am the Server");
}
if(Meteor.isClient)
{
console.log("I am the Client");

Accounts.ui.config({
	passwordSignupFields:"USERNAME_AND_EMAIL"
})

}



