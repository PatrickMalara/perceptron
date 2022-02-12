function Perceptron() {

    this.epoch_limit    = 10;
    this.weights        = [];
    this.thresh         = [];

    this.runs = [];

    this.classify = function( data_set, data_labels, weights, thresh, lr) {

        // For Perfomance of the For Loops
        const data_set_rows = data_set.length;
        let history = [];

        for (let i = 0; i < this.epoch_limit; i++) {
            console.log( "EPOCH: " + i + "--------------------------------");
           
            // For however many Rows in the dataset

            for (let row = 0; row < data_set_rows; row++ ) { 
                console.log( "\t\trow: " + row );
                console.warn( "\t\t\tWeights: ", weights);
                console.warn( "\t\t\tThreshold: ", thresh);

                const run = [];
                run.push( i ); // epoch
                run.push( ...data_set[row] );
                run.push( ...weights );
                run.push( thresh );
                
                // Calculate the output... 

                /*
                 * Weights
                 *      [ 1, 0,  1,  1,  0 ]
                 *
                 * Training set
                 * [
                 *      [ 0, 1, 0.3, 1, 0.5 ]
                 * ]
                 *
                 *  > What we want to do is multiply each column
                 *      in the Training set array by the weights
                 *
                 * */

                const weighted_data = data_set[row].map( ( y, index ) => {
                    return y * weights[index];
                } )


                // wd = Weighted Data
                const summed =  weighted_data.reduce( (total, wd) => {
                    return total += wd;
                }, 0 );

                const output = summed.toFixed(2) > thresh ? 1 : 0;

                run.push( summed.toFixed(2) ); 
                run.push( output ); 
                run.push( data_labels[row] );

                if ( output < data_labels[row] ) {
                    console.log("Weights Up, Thresh Down");
                    run.push("Weights Up, Thresh Down");

                    weights = weights.map( (w, index) => {
                        return w + (data_labels[row] * lr);
                    } );

                    thresh = thresh - lr;

                } else if ( output > data_labels[row] ) {
                    console.log("Weights Down, Thresh Up");
                    run.push("Weights Down, Thresh Up");
    
                    weights = weights.map( (w, index) => {
                        return w - (data_labels[row] * lr);
                    } );

                    thresh = thresh + lr;
                } else {

                    run.push("");
                }


                history.push( [...run] );

            } // End of looping over the Rows
            
            this.weights    = weights;
            this.thresh     = thresh;

        } // End of the Epochs loop

        this.runs = history;
        console.log(this.runs);

    }

    return this;
}
