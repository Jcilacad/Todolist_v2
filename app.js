const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://jcilacad:Test123@cluster0.y4o9m72.mongodb.net/todolistDB', {useNewUrlParser: true});

const itemsSchema = {
    name: String,
};

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

const Item = mongoose.model("Item", itemsSchema);
const john = new Item({
    name: "John Christopher"
});
const joseph = new Item({
    name: "joseph"
});
const joshua = new Item({
    name: "joshua"
});

const itemsArr = [joseph, john, joshua];


app.get("/", function (req, res) {


    Item.find(function (err, item) {
        if (item.length === 0) {
            Item.insertMany(itemsArr, function (err) {
                if (err) {
                    console.log("There was an error")
                } else {
                    console.log("Successfully added an items")
                }
            });
            res.redirect("/");
        } else {
            if (err) {
                console.log("There was an error");
            } else {
                res.render("list", {day: "Today", items: item});
            }
        }

    });


});

app.post("/delete", function (req, res) {

    const checkedItem = req.body.checkbox;
    const nameOfDay = req.body.itemName;

    if (nameOfDay === "Today") {
        Item.findByIdAndRemove(checkedItem, function (err) {
            if (err) {
                console.log("There was an error in deleting");
            }
        });

        res.redirect("/");
    } else {

        List.findOneAndUpdate({name: nameOfDay}, {$pull: {items: {_id: checkedItem}}}, function (err, foundItem) {
            if (!err) {
                res.redirect("/" + nameOfDay);
            }
        });
    }


});

app.post("/", function (req, res) {

    const itemName = req.body.list;
    const itemList = req.body.button;

    const item = new Item({
        name: itemName
    });

    if (itemList === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name: itemList}, function (err, foundItem) {
            foundItem.items.push(item);
            foundItem.save();
            res.redirect("/" + itemList);
        });
    }


});

app.get("/:customListName", function (req, res) {

    const listName = _.capitalize(req.params.customListName);

    List.findOne({name: listName}, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                //Create a new list

                const newList = new List({
                    name: listName,
                    items: itemsArr
                });

                newList.save();
                res.redirect("/" + listName);

            } else {
                res.render("list", {day: foundList.name, items: foundList.items});
            }
        }
    });

});

app.get("/about", function (req, res) {
    res.render("aboutus");
});


app.listen(process.env.PORT, function () {
    console.log("Server is running on port 3000");
});