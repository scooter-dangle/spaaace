define(['mortal', 'physics'], function(Mortal) {
  var Ship = Mortal.extend({
    init: function(id, name) {
      this._super(id);

      this.name = name;

      this.health = this.MAX_HEALTH;
    },

    handleCollision: function() {
    },

    setFire: function(fireCallback) {
      this.fire = fireCallback;
    },

    fireWeapon: function() {
      if (this.firing || this.alive === false) return false;

      var self = this;

      this.firing = true;

      if (this.fire) {
        this.fire();
      }

      setTimeout(function() {
        self.firing = false;
      }, 100);
    },

    isMoving: function() {
      if (this.body) {
        return this.body.isInMotion();
      }
      return false;
    },

    getPosition: function() {
      if (this.body) {
        return this.body.getPosition();
      }
    },

    getGunPosition: function() {
      throw new Error("No gun position defined!");
    },

    accelerate: function() {
      if (this.body) {
        var angle = this.getAngle();
        this.body.acceleration.x = Math.cos(angle * (Math.PI / 180)) * this.ACCELERATION;
        this.body.acceleration.y = Math.sin(angle * (Math.PI / 180)) * this.ACCELERATION;
      }
    },

    rotateLeft: function() {
      if (this.body) {
        this.body.angularVelocity = -this.ROTATION_SPEED;
      }
    },

    rotateRight: function() {
      if (this.body) {
        this.body.angularVelocity = this.ROTATION_SPEED;
      }
    },

    kill: function() {
      this.destroy();
    }
  });

  return Ship;
});
