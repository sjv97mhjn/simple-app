

import { Mongo } from 'meteor/mongo';

 

Images = new Mongo.Collection("images");


Meteor.startup(() => {
  // code to run on server at startup
 if(Meteor.isServer)
{
	console.log("Server");
	console.log(Images.find().count());
	if(Images.find().count() == 0)
	{	for(var i=1;i<23;i++)
		{
		Images.insert({img_src:"img_"+i+".jpg",img_alt:"IMAGE NUMBER" + i});
		}
		//Images.insert({img_src:"home1.jpeg",img_alt:"It happens with me most of the time" });
		//Images.insert({img_src:"home2.jpeg",img_alt:"It happens with me most of the time"});
	
	}
	console.log("From Server Mains : "+ Images.find().count());

	if(Meteor.isServer)
	{console.log("Server from task js file");
		}

}
});
export const Image = Images;


