const knex = require('../dbConfig.js').knex
const Event_Attendee = require('../ModelsDB/event_attendee.js')

eventAttendeeController = {
	add : function(body){
		const newEventAttendee = new Event_Attendee({
      user_id: body.user,
      event_id: body.event, 
      reply: null
  	})
  	return newEventAttendee.save()
	}, 
	getPair: function(id) {
		return knex.select('*').from('event_attendee').where('id', id)
	},
	getAttendees: function(event_id) {
		return knex.select('*').from('event_attendee').where('event_id', event_id)
	},
	getEvents: function(user_id) {
		return knex.select('*').from('event_attendee').where('user_id', user_id)
	},
	findAll : function() {
		return knex.select('*').from('event_attendee')
	}, 	
	deleteById: function(id){
		return knex('event_attendee').where('id', id).del()
	}, 
	deleteByEventOrUser: function(field, user_or_event_id){
		return knex('event_attendee').where(field, user_or_event_id).del()
	},
	deleteByEventAndUser: function(user_id, event_id){
		return knex('event_attendee').where({'event_id': event_id, 'user_id' : user_id}).del()
	}
}

module.exports = eventAttendeeController