class Example extends Phaser.Scene
{
    cursors;
    text;
    chorGroup;
    sprite;
    chorCount = 0;

    preload ()
    {
        this.load.image('police', 'assets/sprites/police.png');         // Make sure police.png is in your assets folder
        this.load.image('chor', 'assets/sprites/chor.png');   // Same for chor.png
    }

    create ()
    {
        // Create the police player
        this.sprite = this.physics.add.image(400, 300, 'police');
        this.sprite.setCollideWorldBounds(true);

        // Genepolicee 10 chor items randomly
        this.chorGroup = this.physics.add.staticGroup({
            key: 'chor',
            frameQuantity: 10,
            immovable: true
        });

        const chorItems = this.chorGroup.getChildren();

        for (let i = 0; i < chorItems.length; i++)
        {
            const x = Phaser.Math.Between(50, 750);
            const y = Phaser.Math.Between(50, 550);
            chorItems[i].setPosition(x, y);
        }

        this.chorGroup.refresh();

        // Display chor count on the screen
        this.text = this.add.text(10, 10, 'Cheese Collected: 0', { font: '28px Courier', fill: '#ffffff' });

        // Display your name on screen
        this.add.text(10, 570, 'Created by Divya', { font: '20px Courier', fill: '#ffffff' });

        // Setup controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Setup overlap event when police collects chor
        this.physics.add.overlap(this.sprite, this.chorGroup, this.collectCheese, null, this);
    }

    update ()
    {
        // Movement logic
        this.sprite.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.sprite.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.setVelocityX(200);
        }

        if (this.cursors.up.isDown)
        {
            this.sprite.setVelocityY(-200);
        }
        else if (this.cursors.down.isDown)
        {
            this.sprite.setVelocityY(200);
        }
    }

    collectCheese (sprite, chor)
    {
        // Hide and disable collected chor
        this.chorGroup.killAndHide(chor);
        chor.body.enable = false;

        // Increase chor count
        this.chorCount++;
        this.text.setText(`Cheese Collected: ${this.chorCount}`);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d6b2d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);
