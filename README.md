# CRUD-operation-KC
Create an API using expressjs mongodb that has a collection  named “shopitems” and “users". The shopitems collection should have the following properties: name(string), description(string) price(number) and isInStock(Boolean).

 

Users collection should have the following properties: fullName(string), username(string), password(string), role(string). The role property can have it's value as either “user” or “admin”.

 

Users should be able to view a list of items in the shop, view a single item via the item's ID. Admins should be able to do all the user can do. The admins can also add, edit and delete a shop item. If a user tries to add, edit or delete a product, he should receive a response with the status code of 403 and a response of “action-not-allowed”.

 

Users and admin should be able to register and login.
