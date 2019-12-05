//
//  ViewController.swift
//  Native_iOS
//
//  Created by Nouf Alturaief on 11/03/1441 AH.
//  Copyright © 1441 Nouf Alturaief. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        NSLog("main view appeared")
    }
    
    @IBAction func browseTapped(_ sender: UIButton) {
        NSLog("photos button tapped")
    }
    
}

