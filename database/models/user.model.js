const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const BCRYPT_SALT = 12;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Vôtre nom d'utilisateur est requis"],
    unique: true,
    minLength: [3, "Votre nom d'utilisateur doit faire au moins 3 caractères"],
    maxLength: [30, "Votre nom d'utilisateur doit faire maximum 30 caractères"],
    validate: {
      validator: (value) => /^[a-zA-Z][a-zA-Z_0-9-]*[a-zA-Z0-9]$/.test(value),
      message: () => "Ceci n'est pas un nom d'utilisateur valide",
    },
  },
  avatar: {
    type: String,
    unique: true,
  },
  local: {
    email: {
      type: String,
      required: [true, "L'adresse mail est requise"],
      unique: [true, "Cette adresse mail est déja enregistrée"],
      validate: {
        validator: (value) =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ),
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      minLength: [10, "Le mot de passe doit faire minimum 10 caractères"],
      validate: {
        validator: (value) => {
          return !value
            ? true
            : /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])/.test(value);
        },
        message: (props) =>
          `${props.value} n'est pas un mot de passe valide. Il doit contenir au moins 1 majuscule, 1 minuscule, un chiffre et un caractère spécial`,
      },
    },
    googleId: { type: String, unique: true },
  },
});

userSchema.pre("save", async function () {
  // If OAuth authentication return.
  if (this.local.googleId) {
    return;
  }

  // If password is encrypted, it is not a new one so return.
  if (RegExp(`^\\$2[abxy]\\$${BCRYPT_SALT}\\$`).test(this.local.password)) {
    return;
  }

  const salt = await bcrypt.genSalt(BCRYPT_SALT);
  this.local.password = await bcrypt.hash(this.local.password, salt);
});

userSchema.methods.isPasswordValid = async function (password) {
  try {
    return await bcrypt.compare(password, this.local.password);
  } catch (err) {
    throw err;
  }
};

const User = model("user", userSchema);

module.exports = User;
