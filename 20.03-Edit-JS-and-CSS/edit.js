var initCustomFields = function(){

	var SelectField = window.Lama.getFieldComponent('select');

	const colWidths = [
	  { value: "c24-24", label: "100%" },
	  { value: "c24-12", label: "50%" },
	  { value: "c24-8", label: "33%" },
	  { value: "c24-6", label: "25%" }
	];

	// Select Colours
	window.Lama.registerFieldComponent("selectColWidth", {

		name: "selectColWidth",
		extends: SelectField.extends,
		props: {
		value: {
		  type: String
		},
		schema: {},
		options: {},
		connector: {}
	  },

		computed: {
			items(){
				return colWidths;
			}
		},
		builder: {
			// 🔹 Define default schema and options when used in a form builder
			props() {
			  return {
				schema: {
				  type: "object",
				  properties: {}
				},
				options: {
				  fields: {}
				}
			  };
			},
	  
			// 🔹 Convert builder config to field schema & options
			fromBuilder(field) {
			  return {
				schema: { type: "string" },
				options: { type: "colWidths" }
			  };
			},
	  
			// 🔹 Convert schema & options back to builder config
			toBuilder(def) {
			  return {
				fieldType: "selectColWidth"
			  };
			}
		  }
	});

	var ObjectField = window.Lama.getFieldComponent('object');

	// Headings (reusable composite field, same pattern as the built-in "address" field)
	window.Lama.registerFieldComponent("headings", {

		name: "headings",
		extends: ObjectField,
		props: {
			connector: {}
		},

		computed: {
			// 🔹 The sub-fields are defined here, so schema.json only needs type "object"
			props() {
				return {
					schema: {
						title: this.schema.title,
						type: "object",
						properties: {
							Heading1: {
								title: "Heading 1",
								type: "string"
							},
							Heading2: {
								title: "Heading 2",
								type: "string"
							}
						}
					},
					options: {
						fields: {
							Heading1: {
								type: "text"
							},
							Heading2: {
								type: "text"
							}
						}
					},
					view: this.view,
					connector: this.connector
				};
			}
		},
		builder: {
			// 🔹 Define default schema and options when used in a form builder
			props() {
				return {
					schema: {
						type: "object",
						properties: {}
					},
					options: {}
				};
			},

			// 🔹 Convert builder config to field schema & options
			fromBuilder(field) {
				return {
					schema: { title: field.label, type: "object" },
					options: { type: "headings" }
				};
			},

			// 🔹 Convert schema & options back to builder config
			toBuilder(def) {
				return {
					label: def.schema.title,
					fieldType: "headings"
				};
			}
		}
	});
}

initCustomFields();

