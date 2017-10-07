import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
    type: DS.attr("string"),
    is_quiz: Ember.computed("type", function() {
        return this.get("type") === "quiz";
    }),
    is_programming: Ember.computed("type", function() {
        return this.get("type") === "programming";
    }),
    is_general: Ember.computed("type", function() {
        return this.get("type") === "general";
    }),
    is_sortable: Ember.computed("type", function() {
        return this.get("type") === "sortable";
    }),
    is_text: Ember.computed("type", function() {
        return this.get("type") === "text";
    }),

    name: DS.attr("string"),
    description: DS.attr("string"),
    state: DS.attr("string"),
    max_score: DS.attr("number"),
    score: DS.belongsTo("module-score", {default: null}),

    is_blank: Ember.computed("state", function() {
        return this.get("state") === "blank";
    }),
    is_correct: Ember.computed("state", function() {
        return this.get("state") === "correct";
    }),
    is_incorrect: Ember.computed("state", function() {
        return this.get("state") === "incorrect";
    }),

    // For sortable
    sortable_list: DS.attr("sortable-list"),

    // For quiz
    questions: DS.attr("quiz-questions"),

    // For code
    code: DS.attr("string"),
    default_code: DS.attr("string"),
    last_datetime: DS.attr("date"),
    last_origin: DS.attr("string"),

    // For general
    submitted_files: DS.attr("files-list"),

    // For text
    fields: DS.attr("raw")
});
