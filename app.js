Vue.component("modal", {
    template: "#modal-template"
});

const app = new Vue({
    el: '#app',
    data: {
        status: "", // Status message of the add isntrument form
        validName: false, // Valid instrument name
        validType: false, // Valid instrument type
        validPrice: false, // Valid instrument price
        validAll: false, // Is everything in the form valid?
        selected: "Fender", // Selected brand input (Fender by default)
        showInstrumentModal: false, // Show the add instrument modal
        showInfoModal: false, // Show the instrument information modal
        noInstruments: false, // Are there no instruments on the page?
        myCartAmount: 0, // Cart amount counter
        myCart: [], // Intstrument items in cart
        indexItem: [], // The selected index instrument object
        indexNum: undefined, // The index value of the selected instrument
        instruments: [
            {
                name: "Electric Guitar",
                type: "Strings",
                brand: "Fender",
                price: 429.99,
                imageUrl: "https://images.unsplash.com/photo-1607560105214-0aaa5f8fcba4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
            },
            {
                name: "Acoustic Guitar",
                type: "Strings",
                brand: "Maton",
                price: 184.99,
                imageUrl: "https://images.unsplash.com/photo-1610557607773-51db1458e1c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
            },
            {
                name: "Trumpet",
                type: "Brass",
                brand: "Maton",
                price: 1199.99,
                imageUrl: "https://images.unsplash.com/photo-1573871666457-7c7329118cf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            },
            {
                name: "Drums",
                type: "Percussion",
                brand: "Yamaha",
                price: 1199.99,
                imageUrl: "https://images.unsplash.com/photo-1504653601220-f1a8ece25e4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            },
            {
                name: "Violin",
                type: "Strings",
                brand: "Fender",
                price: 199.99,
                imageUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            },
            {
                name: "Hand Crash Cymbal",
                type: "Percussion",
                brand: "Yamaha",
                price: 24.99,
                imageUrl: "https://image.shutterstock.com/image-photo/children-playing-cymbal-600w-354413129.jpg"
            },
        ],
        brands: [
            {
                brandName: "Fender"
            },
            {
                brandName: "Yamaha"
            },
            {
                brandName: "Maton"
            }
        ],
        input: {
            name: "",
            type: "",
            brand: "Fender",
            price: "",
            imageUrl: ""
        }
    },
    methods: {

        // Add the instrument card from the form
        addInstrumentCard: function () {
            if (validAll) {
                this.instruments.push(
                    {
                        name: this.input.name,
                        type: this.input.type,
                        brand: this.input.brand,
                        price: this.input.price,
                        imageUrl: this.input.imageUrl
                    })
                this.showInstrumentModal = false
                this.resetInput();
            }
        },

        // Grab the instrument item
        grabItem: function (index) {

            // Set the object item information
            this.indexItem = this.instruments[index];
            // Set the index value of the item
            this.indexNum = index;
        },

        // Add the instrument to the cart
        addToCart: function (index) {

            // Set the index value and object to variables
            this.grabItem(index)

            this.myCartAmount++;
            this.myCart.push(this.indexItem);
            this.instruments.splice(index, 1);
        },

        // Clear the cart
        resetStore: function () {
            this.myCartAmount = 0;
            this.instruments.push(...this.myCart);
            this.myCart = [];
        },

        // Clear the input
        resetInput: function () {
            this.input = {
                name: "",
                type: "",
                brand: "Fender",
                price: "",
                imageUrl: ""
            };
        }
    },
    computed: {
        // Validate form
        warning: function () {
            if (this.validName && this.validType && this.validPrice) {
                validAll = true;
                this.status = "You can now submit (Image is optional)";
                return this.status;
            } else {
                validAll = false;
                return this.status;
            }
        }
    },
    watch: {
        instruments: function () {
            if (this.instruments.length === 0) {
                this.noInstruments = true
            } else {
                this.noInstruments = false
            }
        },
        'input.name': function () {
            if (this.input.name.length < 1) {
                this.validName = false;
            } else {
                this.validName = true;
                this.status = "Still required: instrument type and price";
                console.log("valid name")
            }
        },
        'input.type': function () {
            if (this.input.type.length < 1) {
                this.validType = false;
            } else {
                this.validType = true;
                this.status = "Still required: instrument price";
                console.log("valid type")
            }
        },
        'input.price': function () {
            if (this.input.price.length < 1) {
                this.validPrice = false;
            } else {
                this.validPrice = true;
                console.log("valid price")
            }
        }
    }
})