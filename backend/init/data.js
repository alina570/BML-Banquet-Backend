const events = [
    {
      title: "Tech Conference 2024",
      description: "A conference to explore emerging trends in technology.",
      location: "San Francisco, CA",
      date: new Date("2024-12-28T10:00:00Z"),
      capacity: 300,
      bookedSeats: 120,
      imageURL:"https://cdn.pixabay.com/photo/2013/02/20/01/04/meeting-83519_960_720.jpg",
      createdBy:"6764a02e12d0483e599e4130"
    },
    {
      title: "Music Fest",
      description: "Enjoy live performances by top artists.",
      location: "Los Angeles, CA",
      date: new Date("2024-12-30T18:00:00Z"),
      capacity: 500,
      bookedSeats: 450,
      imageURL:"https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg",
      usersBooked: ["6764a02e12d0483e599e4130", "676498ff25ead66a6f66d7da"],
      createdBy:"6764a02e12d0483e599e4130"
    },
    {
      title: "Startup Pitch Day",
      description: "Showcase your innovative ideas to potential investors.",
      location: "New York, NY",
      date: new Date("2025-01-15T09:00:00Z"),
      capacity: 150,
      bookedSeats: 50,
      imageURL:"https://cdn.pixabay.com/photo/2015/01/08/18/12/startup-593304_1280.jpg",
      usersBooked: ["6764a02e12d0483e599e4130", "676498ff25ead66a6f66d7da"],
      createdBy:"6764a02e12d0483e599e4130"
    },
    {
      title: "Cooking Workshop",
      description: "Learn new culinary techniques from master chefs.",
      location: "Austin, TX",
      date: new Date("2024-12-22T14:00:00Z"),
      capacity: 25,
      bookedSeats: 20,
      imageURL:"https://cdn.pixabay.com/photo/2017/01/14/10/57/woman-1979272_1280.jpg",
      usersBooked: ["6764a02e12d0483e599e4130", "676498ff25ead66a6f66d7da"],
      createdBy:"6764a02e12d0483e599e4130"
    },
    {
      title: "Photography Walk",
      description: "Capture the beauty of nature with expert guidance.",
      location: "Seattle, WA",
      date: new Date("2024-12-20T07:00:00Z"),
      capacity: 20,
      bookedSeats: 10,
      imageURL:"https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_1280.jpg",
      usersBooked: ["6764a02e12d0483e599e4130", "676498ff25ead66a6f66d7da"],
      createdBy:"6764a02e12d0483e599e4130"
    },
  ];
  
  module.exports = { data: events };