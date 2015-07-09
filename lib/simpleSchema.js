SimpleSchema.messages({
    remove_duplicates: 'Please remove duplicate values'
});

SimpleSchema.validators = {
    uniqueArray: function() {
        if (this.value) {
            var filtered = this.value.filter(Boolean);
            var unique = _.uniq(filtered);
            if (unique.length != filtered.length) {
                return 'remove_duplicates';
            }
        }
    }
};