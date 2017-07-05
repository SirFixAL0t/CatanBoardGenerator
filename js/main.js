const possible_starts = [1,2,3,4,7,8,12,13,16,17,18,19];
const board = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
const resources = {"ore": 3, "wheat": 4, "sheep": 4, "brick": 3, "lumber": 4, "desert": 1};
let start = false;
let desert_tile = false;

$('#build_board_button').on('click', ()=>{
    resetBoard();
    generateBoard();
    generateStart();
});

function resetBoard(){
    //reset any type of resource assigned to any tile
    $(".hexagon").removeClass().addClass('hexagon');
    start = false;
}

function generateStart(){
    let desert_index = possible_starts.findIndex(ele => {
        return ele == desert_tile;
    });
    if(desert_index != -1){
        possible_starts.splice(desert_index,1);
    }
    const random_index = Math.floor(Math.random() * possible_starts.length);
    start = possible_starts[random_index];
    $(`#board_tile_${start}`).addClass("button_a");
}

function cloneBoard(){
    let len = board.length;
    let cloned = [];
    while(len--){
        cloned[len] = board[len];
    }
    return cloned;
}

function cloneResources(){
    let keys = Object.keys(resources);
    let len = keys.length;
    let cloned = [];
    while(len--){
        cloned[keys[len]] = resources[keys[len]];
    }
    return cloned;
}

function generateBoard(){
    let this_board = cloneBoard();
    let this_resources = cloneResources();
    let materials = Object.keys(this_resources);
    while(this_board.length > 0){
        //get a random material from the available materials
        let random_material = Math.floor(Math.random() * materials.length);
        let material_name = materials[random_material];

        this_resources[material_name]--;
        let res_q = this_resources[material_name];
        //if there are no more materials available, remove the material from the available list
        if(res_q < 1){
            materials.splice(random_material,1);
        }

        //get a random tile and remove it from the available list
        let random_tile = Math.floor(Math.random() * this_board.length);
        let tile_id = this_board[random_tile];
        this_board.splice(random_tile,1);
        $(`#board_tile_${tile_id}`).addClass(`material-${material_name}`);

        if(material_name == 'desert'){
            desert_tile = tile_id;
        }
    }
}
