import DS from "ember-data";

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        prerequisities: { embedded: 'always' },
    },
    isNewSerializerAPI: true
});

